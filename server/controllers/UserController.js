
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

class UserController {
    static async register(req, res, next) {
        let { username, email, password } = req.body;
        try {
            let user = await User.create({
                username, email, password
            });
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email
            });
        } catch (err) {
            console.log("UserController ~ register ~ err:", err)
            next(err);
        }
    }

    static async login(req, res, next) {
        let { email, password } = req.body;
        try {
            if(!email) {
                throw { name: "BadRequest", message: "Email is required!" };
            }
            if(!email.includes("@")) {
                throw { name: "BadRequest", message: "Wrong email format!" };
            }
            if(!password){
                throw { name: "BadRequest", message: "Password is required!" };
            }
            let user = await User.findOne({ where: { email }});
            if(!user) {
                throw {name: "Unauthorized", message: "Invalid username/password!" };
            }
            
            const isValidPassword = comparePassword(password, user.password);
            if(!isValidPassword) {
                throw {name: "Unauthorized", message: "Invalid username/password!" };
            }

            const access_token = signToken({ 
                id: user.id, 
                email: user.email,
                username: user.username
            });
            res.status(200).json({ access_token });
        } catch (err) {
            console.log(err, '<<< err, login');
            next(err);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { googleToken } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const {name, email} = ticket.getPayload();
            let user = await User.findOne({ where: { email } });
            console.log(user?.toJSON(), "<<< user created");
            if(!user) {
                user = await User.create({
                    username: name,
                    email,
                    password: "1!2@3#4$5%6^"
                });
            }

            console.log({ googleToken });
            const access_token = signToken({ 
                id: user.id, 
                email: user.email,
                username: user.username
            });
            res.status(200).json({ access_token });
        } catch (err) {
            next(err);
        }
    }

    static async getOneUser(req, res, next) {
        try {
            let inUsername = req.user.username;
            let user = await User.findOne({ where: {username: inUsername}});
            if(!user) {
                throw {name: "NotFound", message: "User not found!" };
            }
            res.status(200).json({
                username: user.username,
                email: user.email
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;