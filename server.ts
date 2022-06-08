import { createServer } from 'http'
import express from 'express'
import initializeRoutes from './routes/index'
import createSockets from './connections/socket'
import initializeOSC from './connections/osc'
import cors from 'cors'
// const hostIP = '192.168.0.100'
const hostIP = 'localhost'
const port = 3000

const app = express()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

initializeRoutes(app)

const httpServer = createServer(app)

const io = createSockets(httpServer)

initializeOSC(io, hostIP)

httpServer.listen(port, () => {
  console.log('Server running on port: ' + port)
})


