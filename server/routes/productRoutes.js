const Route = require('express').Router()
const ProductController = require('../controllers/productController')
const isAdmin = require('../middlewares/authorizeAdmin')
const gcsMiddlewares = require('../middlewares/uploadImage')
// const images = require('../middlewares/images')
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
})

Route.get('/', ProductController.gets)
Route.post('/', isAdmin, ProductController.create)
Route.put('/:id', isAdmin, ProductController.update)
Route.put('/:id', isAdmin, ProductController.findOne, gcsMiddlewares.deleteFileImage, ProductController.update)
Route.delete('/:id', isAdmin, ProductController.findOne, gcsMiddlewares.deleteImage, ProductController.delete)
Route.post('/image/upload', multer.single('image'), gcsMiddlewares.uploadSingle, ProductController.uploadImage)

// Route.post('/image/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })


module.exports = Route