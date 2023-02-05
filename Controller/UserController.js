const { UserModel } = require("../Models/User.model");
const bcrypt = require('bcrypt');
require('dotenv').config();

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
    const {id} = req.params;

    try {
        let user = await UserModel.findById(id);
        if(id === req.body.userId || user._doc.role === "admin") {
            await UserModel.findByIdAndDelete(id);
            res.send({ message: "User deleted"});
        }else{
            res.send({ message: "User not Authorised."});
        }
    } catch (error) {
        res.send({ message: error});
    }
}
module.exports = {
    getUserById,
    updateUser,
    deleteUser
}