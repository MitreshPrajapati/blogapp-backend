
const { Router } = require('express');
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();
// const cors = require('cors');
// porfileUrlRouter.use(cors());

const upload = require('../multer');
const cloudinary = require('../cloudinary');
const porfileUrlRouter = Router();


porfileUrlRouter.use(bodyParser.json());
porfileUrlRouter.use(bodyParser.urlencoded({ extended: false }));

porfileUrlRouter.post("/", upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    // console.log(req)
    if (req.method === 'POST') {

        const urls = [];
        const files = req.files;

        // for(const file of files){
        const { path } = req.files[0];

        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
        // }


        res.send({
            message: 'Images uploaded.',
            data: urls
        })
    } else {
        res.send({ message: 'Images not uploaded' })
    }
});

module.exports = { porfileUrlRouter };







