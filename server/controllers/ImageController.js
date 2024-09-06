const { Image, User }= require('../models');
const axios = require('axios');
const fal = require('@fal-ai/serverless-client');
const mime = require('mime-types');
const { imgbox } = require('imgbox-js');
const { where } = require('sequelize');
const nodemailer = require('nodemailer');
const { auth } = require('google-auth-library');
const Mailgen = require('mailgen');

fal.config({
  credentials: process.env.FAL_CLIENT_KEY
});

class ImageController {
    static async getAllImgData(req, res, next) {
        try {
            let data = await Image.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email']
                    }
                ]
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async postImg(req, res, next) {
        let {imgName, prompt} = req.body;
        try {
            if (!req.files || !req.files.File) {
                throw { name: "NotFound", message: "No files were uploaded." };
            }
            let File = req.files.File;
            const mimeType = mime.lookup(File.name);
            // Buffer file to Base64
            const base64Data = File.data.toString('base64');
            const base64URI = `data:${mimeType};base64,${base64Data}`;
            
            const falResult = await fal.subscribe("fal-ai/flux-lora/image-to-image", {
                input: {
                  prompt: `Transform this image into anime style, ${prompt}`, // Modify as you needed
                  image_url: base64URI
                },
                logs: true,
                onQueueUpdate: (update) => {
                  if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                  }
                },
            });
            console.log(falResult, '<<< FALRESULT');
            const falImgUrl = falResult.images[0].url;

            // const falImgResponse = await axios.post('https://api.imgur.com/3/upload', {
            //     image: falImgUrl,
            //     type: 'url',
            // }, {
            //     headers: {
            //         Authorization: process.env.IMGUR_CLIENT_ID
            //     }
            // });
            // const finalImgUrl = falImgResponse.data.data.link;

            let upImgBox = await imgbox(falImgUrl);
            console.log(upImgBox, "<< upIMGBOX");
            let imgBoxUrl = upImgBox.data[0].original_url;

            const aiResult = await Image.create({
                imgName: imgName,
                imgUrl: imgBoxUrl,
                prompt: prompt,
                userId: req.user.id
            });
            res.status(201).json(aiResult);
        } catch (err) {
            next(err);
            res.status(500).json({err});
        }
    }

    static async deleteOneData(req, res, next) {
        try {
            let id = +req.params.id;
            let data = await Image.findByPk(id);
            if(!data) {
                throw {name: 'NotFound', message: `Data with Id ${id} not found!`};
            }
            await data.destroy();
            res.status(200).json({message: `Data id ${id} has been deleted!`});
        } catch (err) {
            next(err);
        }
    }

    static async getMyImages(req, res, next) {
        try {
            let userId = +req.user.id;
            let data = await Image.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email']
                    }
                ],
                where: {userId},
                order: [['id', 'ASC']]
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getImageById(req, res, next) {
        let {id} = req.params;
        try {
            let image = await Image.findByPk(id);
            if(!image) {
                throw {name: 'NotFound', message: 'Image Data Not Found!'};
            }
            res.status(200).json({data: image});
        } catch (err) {
            next(err);
        }
    }

    static async editImageById(req, res, next) {
        let { imgName } = req.body;
        try {
            let id = +req.params.id;
            let imageData = await Image.findByPk(id);
            if(!imageData) {
                throw {name: 'NotFound', message: 'Image Data Not Found!'};
            }
            await imageData.update({imgName});
            res.status(200).json({imageData});
        } catch (err) {
            next(err);
        }
    }

    static async sendToMailById(req, res, next) {
        try {
            let id = req.params.id;

            let imgData = await Image.findByPk(id);
            if(!imgData) {
                throw {name: 'NotFound', message: 'Image Data Not Found!'};
            }

            const imageUrl = imgData.imgUrl;

            const response = await axios.get(imageUrl, {responseType: 'arraybuffer'});
            const imgBuffer = Buffer.from(response.data, 'binary');

            let config = {
                service: 'gmail',
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASSKEY
                }
            }
            const transporter = nodemailer.createTransport(config);

            let MailGenerator = new Mailgen({
                theme: "default",
                product: {
                    name: "Animage",
                    link: 'https://animage.com'
                }
            });
    
            // Mail content generation using Mailgen
            let responses = {
                body: {
                    name: req.user.name || "User",
                    intro: "Here is the image you requested from Animage!",
                    table: {
                        data: [
                            {
                                item: imgData.imgName || "Your Generated Image",
                                description: "AI-generated image from Animage",
                                price: "Free"
                            }
                        ]
                    },
                    outro: "We hope you enjoy your image! Looking forward to more creations."
                }
            };
            
            let mail = MailGenerator.generate(responses);
    
            let message = {
                from: "fabiantenzara@gmail.com",
                to: req.user.email,
                subject: "Your Animage Result",
                html: mail,
                attachments: [
                    {
                        filename: imgData.imgName || 'image.jpg',
                        content: imgBuffer,
                        contentType: 'image/jpeg'
                    }
                ]
            };
            await transporter.sendMail(message);

            res.status(200).json({ message: 'Email sent successfully with the image attachment.' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ImageController;
