
const { Router } = require('express');
const express = require('express');
const { SignupFn, LoginFn } = require('../Controller/AuthenticationController');
const upload  = require('../multer');
const cloudinary = require('../cloudinary');
const fs = require('fs');
const bcrypt = require('bcrypt');

const { UserModel } = require('../Models/User.model');

const authRouter = Router();


authRouter.post('/signup', SignupFn);
authRouter.post('/login', LoginFn);


// async (req, res) => {
//     const { user_name, email, password } = req.body;
//     // console.log(req);
//     if (email.includes("@gmail.com") ||
//         email.includes("@ymail.com") ||
//         email.includes("@hotmail.com")) {
//         const user = await UserModel.findOne({ email });
//         if (user) {
//             res.send({ message: "User already exists, Please Login" });
//         } else {
//             // const uploader = async (path) => await cloudinary.uploads(path, 'Images');
//             // let urls = [];
//             // const {path} = req.file;
//             // console.log("path"+path);
//             // let newPath = await uploader(path);
//             // fs.unlinkSync(path);
//             // const files = req.files;
//             // for(const file in files){
//             //     const { path } = file;
//             //     const newPath = await uploader(path);
//             //     urls.push(newPath);
//             //     // urls = newPath
//             //     fs.unlinkSync(path);
//             // }
//             // console.log(urls)
//         //    await files.forEach(async (file) => {
//         //         const { path } = file;
//         //         let newPath = await uploader(path);
//         //         console.log(newPath);
//         //         urls.push(newPath);
//         //         fs.unlinkSync(path);

//         //     })
//             // console.log("newPath"+newPath);
//             // let encryptedPassword = password;
//             bcrypt.hash(password, Number(process.env.ROUND), async function (err, hashedPassword) {

//                 if (err) {
//                     res.send({ message: err.message })
//                 }
//                 const newUser =  new UserModel({
//                     avatar: '',
//                     user_name,
//                     email,
//                     password: hashedPassword
//                 })
//                 console.log(newUser)
//                 await newUser.save();
//                 res.send({ message: "User registred successfully.", urls });
//                 // encryptedPassword = hashedPassword;
//                 // console.log(req.body.password);
//             });
//         //    console.log(req.body, urls);
//             // try {
//             //     const newUser = await new UserModel({
//             //         avatar: urls[0],
//             //         user_name,
//             //         email,
//             //         password: encryptedPassword
//             //     })
//             //     console.log(newUser)
//             //     await newUser.save();
//             //     res.send({ message: "User registred successfully." });
//             // } catch (error) {
//             //     res.send({ message: "Something went wrong, Please try later." });
//             // }
//         }
//     } else {
//         res.send({ message: "Incorrect email type." })
//     }

// }

module.exports = { authRouter }