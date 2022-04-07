
import socket from 'socket.io'
const OSC = require('osc-js')

function startOsc(io: socket.Server, host: string) {
    const options = {
        open: {
            host,
            port: 6448
        }
    }
    
    const osc = new OSC({ plugin: new OSC.DatagramPlugin(options) })
    osc.on('*', (message: any) => {
        console.log( message.args[0] )
        io.emit('velocity', message.args[0])
    })
    
    osc.open()
}

export default startOsc