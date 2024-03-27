const { UserModel } = require("../Models/User.model");
const bcrypt = require('bcrypt');
require('dotenv').config();
// const upload  = require('../multer');
// const cloudinary = require('../cloudinary');
// const fs = require('fs');

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.send(otherDetails);
        } else {
            res.send({ message: "User not found." })
        }
    } catch (err) {
        res.send({ message: err })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        // find user in database
        const user = await UserModel.findById(id);
        // if user want to change password 
        // then encrypt the new password and update req.body.password 
        // now update user with req.body
        if (user && req.body.password) {
            bcrypt.hash(req.body.password, Number(process.env.ROUND), async function (err, hashedPassword) {
                if (err) res.send({ message: err })
                else {
                    req.body.password = hashedPassword
                }
                const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

                res.send({ updatedUser, message: "Password changed" })
            });

        } else if (user && !req.body.password) {
            const updatedUser = await UserModel.findByIdAndUpdate(id, req.body);
            const { password, ...otherDetails } = updatedUser._doc;
            res.send(otherDetails);
        }
        else {
            res.send({ message: "User not found." })
        }
    } catch (error) {
        res.send({ message: error })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        let user = await UserModel.findById(id);
        if (id === req.body.userId || user._doc.role === "admin") {
            await UserModel.findByIdAndDelete(id);
            res.send({ message: "User deleted" });
        } else {
            res.send({ message: "User not Authorised." });
        }
    } catch (error) {
        res.send({ message: error });
    }
}

const followUser = async (req, res) => {
    const userId = req.params.id;
    const currUserId = req.body.userId;
    // console.log(userId,currUserId+"from followFun")
    if (userId !== currUserId) {
        try {
            const followUser = await UserModel.findById(userId);
            const followingUser = await UserModel.findById(currUserId);

            if (!followUser.followers.includes(currUserId)) {
                await followUser.updateOne({ $push: { followers: currUserId } })

                await followingUser.updateOne({ $push: { following: userId } })

                res.send({ message: "User Followed." })
            }
        } catch (error) {
            res.send({ message: error })
        }

    } else {
        res.send({ message: "Action Forbidden." })
    }
}

const unFollowUser = async (req, res) => {
    const userId = req.params.id;
    const currUserId = req.body.userId;

    if (userId !== currUserId) {
        try {
            const followUser = await UserModel.findById(userId);
            const followingUser = await UserModel.findById(currUserId);

            if (followUser.followers.includes(currUserId)) {
                await followUser.updateOne({ $pull: { followers: currUserId } });
                await followingUser.updateOne({ $pull: { following: userId } });

                res.send({ message: "User UnFollowed." })
            }

        } catch (error) {
            res.send({ message: error.message })
        }
    } else {
        res.send({ message: "Action Forbidden." })
    }
}




module.exports = {
    getUserById,
    updateUser,
    deleteUser,
    followUser,
    unFollowUser,
    // updateProfilePic
}