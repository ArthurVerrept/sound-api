import socket from 'socket.io'
import http from 'http'
import express from 'express'
import cors from 'cors'
const OSC = require('osc-js')

const options = {
    send: {
        host: 'localhost',
        port: 6448
    }
}

const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) })

osc.open()

const arduinoPort = 3500

const app = express()
app.use(cors())

const httpServer = http.createServer(app)

const io = new socket.Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
})
  
    io.on('connection', (socket) => {
  
    socket.on('velocity', function(data) {
        osc.send(new OSC.Message('/device3', data.velocity))
    })
})

httpServer.listen(arduinoPort, () => {
    console.log('Mock Arduino running on port: ' + arduinoPort)
})
