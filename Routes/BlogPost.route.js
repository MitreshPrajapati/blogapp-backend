const { Router } = require('express');
const express = require('express');

// required Models
const { BlogPost } = require('../Models/Blog.model');

//controllers
const { createPost,
     getPosts,
     updatePost,
     deletePost, 
     getPostById} = require('../Controller/BlogPostController');


const blogPostRouter = Router();

// blogPostRouter.get('/', async(req, res)=>{
//     res.send("post");
// })

blogPostRouter.get('/posts', getPosts);
blogPostRouter.get('/posts/:id',getPostById);
blogPostRouter.post('/create/post', createPost);
blogPostRouter.put('/update/:id', updatePost);
blogPostRouter.delete('/delete/:id', deletePost);



module.exports = {blogPostRouter}



