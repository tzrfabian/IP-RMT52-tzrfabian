
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');
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
                throw { name: "BadRequest", message: "Username is required!" };
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

            const access_token = signToken({ id: user.id, email: user.email });
            res.status(200).json({ access_token });
        } catch (err) {
            console.log(err, '<<< err, login');
            next(err);
        }
    }
}

module.exports = UserController;