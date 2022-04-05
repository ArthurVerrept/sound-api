import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let connectedDevices: any[] = []

io.on("connection", (socket) => {
  // HANDLE CLIENT CONNECTION
  const connectionReq = socket.handshake.query
  connectedDevices.push(connectionReq.name);
  io.emit('connectedDevices', connectedDevices)

  // HANDLE CLIENT DISCONNECT
  socket.on('disconnect', function() {
    const disconnectReq = socket.handshake.query

      connectedDevices = connectedDevices.filter(e => e !== disconnectReq.name);
      io.emit('connectedDevices', connectedDevices)
  });


  // HANDLE CLIENT SENDING VELOCITY
  socket.on('velocity', function(data) {
    io.emit('velocity', data)
  });
});

httpServer.listen(3000);

