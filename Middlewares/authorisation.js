const mongoose = require('mongoose')
const { UserModel } = require('../Models/User.model')


const authorisation = (permittedRoles) => {
    return async (req, res, next) => {
        const email = req.body.email
        const user = await UserModel.findOne({email})
        const role = user.role;
    
            if(permittedRoles.includes(role)){
                next()
            }
            else{
                res.send("Not authorised")
            }
    }
}

module.exports = {authorisation};