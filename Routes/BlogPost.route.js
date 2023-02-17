const { Router } = require('express');
const express = require('express');

// required Models
const { BlogPost } = require('../Models/Blog.model');

//controllers
const { createPost,
     getPosts,
     updatePost,
     deletePost,
     getPostById,
     getOwnPostsOnly } = require('../Controller/BlogPostController');
const upload = require('../multer');


const blogPostRouter = Router();
blogPostRouter.use(bodyParser.json());
blogPostRouter.use(bodyParser.urlencoded({ extended: false }));


blogPostRouter.get('/posts', getPosts);
blogPostRouter.get('/own/posts', getOwnPostsOnly);
blogPostRouter.get('/posts/:id', getPostById);
blogPostRouter.post('/create/post', createPost);
blogPostRouter.patch('/update/:id', updatePost);
blogPostRouter.delete('/delete/:id', deletePost);



module.exports = { blogPostRouter }



