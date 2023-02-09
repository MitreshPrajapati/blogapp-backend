
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../Models/User.model");
require('dotenv').config();

const SignupFn = async (req, res) => {
    const { user_name, email, password } = req.body;

    if (email.includes("@gmail.com") ||
        email.includes("@ymail.com") ||
        email.includes("@hotmail.com")) {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.send({ message: "User already exists, Please Login" });
        } else {

            bcrypt.hash(password, Number(process.env.ROUND), async function (err, hashedPassword) {

                if (err) {
                    res.send({ message: err.message })
                }

                const newUser = new UserModel({
                    user_name,
                    email,
                    password: hashedPassword
                })

                await newUser.save();
                res.send({ message: "User registred successfully." });

            });
        }
    } else {
       res.send({message:"Incorrect email type."})
    }

}


const LoginFn = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (email.includes("@gmail.com") ||
            email.includes("@ymail.com") ||
            email.includes("@hotmail.com")
        ) {
            const user = await UserModel.findOne({ email });


            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.send({ message: err })
                    } else {
                        if (result) {
                            const token = jwt.sign({ userId: user._id, user_name: user.user_name }, process.env.SECRETKEY)
                            res.send({ user, "token": token })
                        } else {
                            res.send({ message: " Wrong credintials" })
                        }
                    }
                });
            } else {
                res.send({ message: "User doesn't exists, Please Signup/ Register first." })
            }
        } else {
            res.send({ message: "Incorrect email type." })
        }


    } catch (error) {
        res.send({ message: error.message })
    }
}


module.exports = {
    SignupFn,
    LoginFn
}