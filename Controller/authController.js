const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_LINE, { expiresIn: "1h" });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.cookie('Auth', token, { expiresIn: '1h', httpOnly: true });
    user.password = undefined;

    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            user
        }
    })
}

module.exports.registerUser = async(req, res, next) => {
    const { name, email, password } = req.body;
    try {
        if (password !== "") {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            });
            createSendToken(newUser, 201, req, res);
        }
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Try again',
        })
    }
}
module.exports.loginUser = async(req, res, next) => {

    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res
                .status(400)
                .json({
                    status: "error",
                    message: "Please enter Email and Password",
                });
        }
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compareSync(password, user.password))) {
            res.status(401).json({
                status: 'error',
                message: 'Email or Password incorretct'
            });
        }
        createSendToken(user, 200, req, res);
    } catch (err) {
        console.log(err);
    }
}
module.exports.logoutUser = async(req, res, next) => {
    res.cookie('Auth', "", { maxAge: 1 });
    res.redirect('/login');
}