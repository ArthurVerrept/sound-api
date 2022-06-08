import util from 'util'
import multer from 'multer'
import path from 'path'
const __baseUrl = path.join(__dirname, '../')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __baseUrl + '/resources/static/assets/uploads/')
  },
  filename: (req, file, cb) => {
    if (file.originalname.includes(' ')) {
      file.originalname = file.originalname.replace(/\s+/g, '-').toLowerCase();
    }
    cb(null, file.originalname)
  },
})
let uploadFile = multer({
  storage: storage
  // limits: { fileSize: maxSize },
}).array('file', 100)
let uploadFileMiddleware = util.promisify(uploadFile)
export default uploadFileMiddleware