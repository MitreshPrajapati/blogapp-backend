const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    title: String,
    desc: String,
    images: String
}, { timestamps: true })


const BlogPost = mongoose.model('post', blogSchema);

module.exports = { BlogPost }