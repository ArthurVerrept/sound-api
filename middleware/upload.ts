import util from 'util'
import multer from 'multer'
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/resources/static/assets/uploads/')
  },
  filename: (req, file, cb) => {
    console.log(file)
    console.log(file.originalname)
    cb(null, file.originalname)
  },
})
let uploadFile = multer({
  storage: storage
  // limits: { fileSize: maxSize },
}).single('file')
let uploadFileMiddleware = util.promisify(uploadFile)
export default uploadFileMiddleware