import uploadFile from '../middleware/upload'
import fs from 'fs'
import express from 'express'
import { FilesList } from '../types/files'
import path from 'path'
const baseUrl = 'http://localhost:8080/files/'
const __baseUrl = path.join(__dirname, '../')

async function upload(req: express.Request, res: express.Response) {
  try {
    await uploadFile(req, res)
    if (req.file == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }
    console.log('PAST UPLOAD FILE')
    res.status(200).send({
      message: 'Uploaded the file successfully: ' + req.file.originalname,
    })
  } catch (err) {
    if(req.file) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      })
    }
  }
}

const getListFiles = (req: express.Request, res: express.Response) => {
  const directoryPath = __baseUrl + '/resources/static/assets/uploads/'
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      })
    }
    let fileInfos: FilesList[] = []
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      })
    })
    res.status(200).send(fileInfos)
  })
}
const download = (req: express.Request, res: express.Response) => {
  const fileName = req.params.name
  const directoryPath = __baseUrl + 'resources/static/assets/uploads/'
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      })
    }
  })
}
export default {
  upload,
  getListFiles,
  download,
}