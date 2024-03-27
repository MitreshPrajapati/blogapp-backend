
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
    const token =  req?.headers?.authentication?.split(" ")[1] || req.body.headers?.authentication?.split(" ")[1]; 
    // const t = req.body;
    // console.log("from Authentication "+ token);
    try {
        if (token) {
            var decoded = jwt.verify(token, process.env.SECRETKEY);
            
            req.body.userId = decoded.userId
            req.body.username = decoded.user_name
            // console.log(req.body);
            next()
        } else {
            res.send("User not authenticated.")
        }
    }
    catch (err) {
        res.send({message: err})
    }
}

module.exports = { authentication };