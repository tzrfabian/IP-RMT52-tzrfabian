const { Image }= require('../models');
const imgur = require('imgur');
const path = require('path');
const axios = require('axios');

class ImageController {
    static async getImgData(req, res, next) {
        try {
            
        } catch (err) {
            next(err);
        }
    }

    static async postImg(req, res, next) {
        try {
            if (!req.files || !req.files.sampleFile) {
                throw { name: "NotFound", message: "No files were uploaded." };
            }
            let sampleFile = req.files.sampleFile;
            // Buffer file to Base64
            const base64Data = sampleFile.data.toString('base64');
            // Upload file base64 to Imgur
            const response = await axios.post('https://api.imgur.com/3/upload', {
                image: base64Data,
                type: 'base64'
            }, {
                headers: {
                    Authorization: process.env.IMGUR_CLIENT_ID
                }
            });
            const imgUrl = response.data.data.link;
            const newImage = await Image.create({
                imgName: sampleFile.name,
                imgUrl: imgUrl,
                userId: req.user.id
            });

            res.status(201).json(newImage);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ImageController;
