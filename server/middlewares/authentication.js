const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    console.log("~ authentication ~ req.headers:", req.headers)
    // take token first
    let bearerToken = req.headers.authorization;
    if(!bearerToken) {
        next({ name: "Unauthorized", message: "Invalid Token" });
        return;
    }

    let [, token] = bearerToken.split(' ');
    if(!token) {
        next({ name: "Unauthorized", message: "Invalid Token" });
        return;
    }

    try {
        // verify token
        let data = verifyToken(token);
        console.log(data);
        
        // check in database
        let user = await User.findByPk(data.id);
        if(!user) {
            next({ name: "Unauthorized", message: "Invalid Token" });
            return;
        }
        // attach user ke request
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    authentication
};