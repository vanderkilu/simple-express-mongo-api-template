const multer = require('multer')
const dataURI = require('datauri')
const path = require('path')

const storage = multer.memoryStorage();
const uploadMiddleWare = multer({ storage }).single('image');

const storageUrl = new dataURI()
const toStorageUrl = (req)=> {
    storageUrl.format(path.extname(req.file.originalname).toString(),
    req.file.buffer)
}


module.exports = {
    uploadMiddleWare,
    toStorageUrl
}