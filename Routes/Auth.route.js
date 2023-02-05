
const { Router } = require('express');
const express = require('express');
const { SignupFn, LoginFn } = require('../Controller/AuthenticationController');

const authRouter = Router();

authRouter.post('/signup', SignupFn);
authRouter.post('/login', LoginFn);




module.exports = {authRouter}