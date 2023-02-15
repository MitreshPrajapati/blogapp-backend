const express = require('express');
const { Router } = require('express');
const { getUserById, updateUser, deleteUser, updateProfilePic } = require('../Controller/UserController');
const { authentication } = require('../Middlewares/authentication');
const { UserModel } = require('../Models/User.model');


const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.send("user");
})


// userRouter.patch('/profile/:id',authentication, upload.array('image'),async (req, res) => {
//     const { id } = req.params;
//     try {
//         const uploader = async (path) => await cloudinary.uploads(path, 'Images');
//         let urls = [];
        
//         const files = req.files;
//         for (const file in files) {
//             const { path } = file;
//             const newPath = await uploader(path);
//            await urls.push(newPath);
//             fs.unlinkSync(path);
//         }
//         console.log(urls)
//         // res.send(urls)
//         let user = await UserModel.findById(id);
//         if (id === req.body.userId || user._doc.role === "admin") {
            
//             req.body.avatar = urls[0]?.url;
//             await UserModel.findByIdAndUpdate(id, req.body, { new: true });
//             res.send({ message: "User Profile Updated" });
//         } else {
//             res.send({ message: "User not Authorised." });
//         }
//     } catch (error) {
//         res.send({ message: error+" from catch block" });
//     }
// } )

userRouter.get('/:id',authentication, getUserById)
userRouter.delete('/:id',authentication, deleteUser);
userRouter.patch('/:id',authentication, updateUser)

module.exports = { userRouter }