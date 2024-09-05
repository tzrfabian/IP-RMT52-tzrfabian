const { Image, User }= require('../models');
const axios = require('axios');
const fal = require('@fal-ai/serverless-client');

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
        try {
            if (!req.files || !req.files.File) {
                throw { name: "NotFound", message: "No files were uploaded." };
            }
            let File = req.files.File;
            // Buffer file to Base64
            const base64Data = File.data.toString('base64');
            const imgurResponse = await axios.post('https://api.imgur.com/3/upload', {
                image: base64Data,
                type: 'base64',
            }, {
                headers: {
                    Authorization: process.env.IMGUR_CLIENT_ID
                }
            });
            const imgUrl = imgurResponse.data.data.link;
            
            const falResult = await fal.subscribe("fal-ai/flux-lora/image-to-image", {
                input: {
                  prompt: "Transform this image into anime style", // Modify as you needed
                  image_url: imgUrl
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

            const falImgResponse = await axios.post('https://api.imgur.com/3/upload', {
                image: falImgUrl,
                type: 'url',
            }, {
                headers: {
                    Authorization: process.env.IMGUR_CLIENT_ID
                }
            });

            const finalImgUrl = falImgResponse.data.data.link;

            const aiResult = await Image.create({
                imgName: File.name,
                imgUrl: finalImgUrl,
                userId: req.user.id
            });
            res.status(201).json(aiResult);
        } catch (err) {
            next(err);
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
}

module.exports = ImageController;
