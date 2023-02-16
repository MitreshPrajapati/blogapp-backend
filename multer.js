const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename : function(req, file, cb){
        console.log(req)
        cb(null, Date.now()+"-"+file.originalname);
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
}

// const upload = multer({
//     storage : storage
// })
const upload = multer({
    storage : storage,
    fileFilter: fileFilter
})


module.exports = upload;