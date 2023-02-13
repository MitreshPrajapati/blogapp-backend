
const { Router } = require('express');
const express = require('express');
const { SignupFn, LoginFn } = require('../Controller/AuthenticationController');
const upload = require('../multer');
const cloudinary = require('../cloudinary');
const authRouter = Router();

authRouter.post('/signup', upload.single('image'), SignupFn);
authRouter.post('/login', LoginFn);




module.exports = { authRouter }