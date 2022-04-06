import express from 'express'
import fileController from '../controllers/file.controller'

const router = express.Router()

function routes(app: express.Application) {
  router.post('/upload', fileController.upload)
  router.get('/files', fileController.getListFiles)
  router.get('/files/:name', fileController.download)
  app.use(router)
}

export default routes