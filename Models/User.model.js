const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "client"
    },
    following: [],
    followers: []

}, { timestamps: true })

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel }