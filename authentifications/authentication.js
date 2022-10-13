const jwt = require("jsonwebtoken");
const User = require('../models/user');


const verifyToken = async(req, res, next) => {
    const token = await req.cookies.Auth;
    if (token) {
        await jwt.verify(token, process.env.SECRET_LINE, (err, decodedToken) => {
            if (err) {
                console.log('err is due', err);
                res.redirect('/login')
            }
            next();
        });
    } else {
        res.redirect('/login');
    }
}
const checkCurrentUser = async(req, res, next) => {
    const token = req.cookies.Auth;
    if (token) {
        await jwt.verify(token, process.env.SECRET_LINE, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            const user = await User.findById(decodedToken.id);
            if (user) {
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}
module.exports = { verifyToken, checkCurrentUser };