import socket from 'socket.io'
const OSC = require('osc-js')
import http from 'http'

function startSocket(httpServer: http.Server) {
    const io = new socket.Server(httpServer, {
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
    return io
}

export default startSocket