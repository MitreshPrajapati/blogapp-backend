
const { Router } = require('express');
const express = require('express');

const bodyParser = require('body-parser');
const fs = require('fs');
require('dotenv').config();

const upload  = require('../multer');
const cloudinary = require('../cloudinary');
const porfileUrlRouter = Router();


porfileUrlRouter.use(bodyParser.json());
porfileUrlRouter.use(bodyParser.urlencoded({ extended: false }));

porfileUrlRouter.use('/', upload.array('image'), async(req,res)=>{
    const uploader = async(path)=> await cloudinary.uploads(path,'Images')
    if(req.method === 'POST'){
        const urls =[];
        const files = req.files;

        for(const file of files){
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        console.log(urls);
        

        res.send({message: 'Images uploaded.', 
    data: urls})
    }else{
        res.send({message: 'Images not uploaded'})
    }
});

module.exports = {porfileUrlRouter};







