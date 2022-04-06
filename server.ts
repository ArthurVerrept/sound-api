import { createServer } from 'http'
import express from 'express'
import initializeRoutes from './routes/index'
import initializeSocket from './socket'

const port = 3000


const app = express()

app.use(express.urlencoded({ extended: true }))

initializeRoutes(app)

const httpServer = createServer(app)

initializeSocket(httpServer)

httpServer.listen(port, () => {
  console.log('Server running on port: ' + port)
})

