const express = require('express');
const { Router } = require('express');
const { getUserById, updateUser, deleteUser } = require('../Controller/UserController');
const { authentication } = require('../Middlewares/authentication');
const { UserModel } = require('../Models/User.model');


const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.send("user");
})



userRouter.get('/:id',authentication, getUserById)
userRouter.delete('/:id',authentication, deleteUser);
userRouter.patch('/:id',authentication, updateUser)

module.exports = { userRouter }