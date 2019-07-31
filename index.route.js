const router = require('express').Router()
const userRoutes = require('./server/user/user.routes')
const {uploadMiddleWare, toStorageUrl} = require('./server/config/multer')
const cloudinaryConfig = require('./server/config/cloudinary')
const cloudinary = require('cloudinary').v2

router.use('/users', userRoutes)
router.post('/uploads', cloudinaryConfig, uploadMiddleWare, async(req, res,next)=> {
    if (req.file) {
        const fileUrl = toStorageUrl(req).content
        try {
            const uploadedFile = await cloudinary.uploader.upload(fileUrl, {
                folder: process.env.CLOUDINARY_FOLDER_NAME,
                use_filename: true
            })
            //process the file here or store path in db
            res.json(uploadedFile)
        }
        catch(err) {
            next(err)
        }       
    }
    else {
        res.json('no file')
    }
})

module.exports = router