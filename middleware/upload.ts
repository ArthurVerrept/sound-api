import util from 'util'
import multer from 'multer'
import path from 'path'
const __baseUrl = path.join(__dirname, '../')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __baseUrl + '/resources/static/assets/uploads/')
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