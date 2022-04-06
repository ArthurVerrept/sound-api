import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'
import initializeRoutes from './routes/index'
import path from 'path'

const port = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))

initializeRoutes(app)
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let connectedDevices: any[] = []

io.on('connection', (socket) => {
  // HANDLE CLIENT CONNECTION
  const connectionReq = socket.handshake.query
  connectedDevices.push(connectionReq.name)
  io.emit('connectedDevices', connectedDevices)

  // HANDLE CLIENT DISCONNECT
  socket.on('disconnect', function() {
    const disconnectReq = socket.handshake.query

      connectedDevices = connectedDevices.filter(e => e !== disconnectReq.name)
      io.emit('connectedDevices', connectedDevices)
  })


  // HANDLE CLIENT SENDING VELOCITY
  socket.on('velocity', function(data) {
    io.emit('velocity', data)
  })
})

httpServer.listen(port, () => {
  console.log('Server running on port: ' + port)
})

