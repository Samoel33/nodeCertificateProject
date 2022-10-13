const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'Email already registered, Login if you are the email owner'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'normal'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;