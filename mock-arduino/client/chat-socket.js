const socket = io('http://localhost:3000', { query: "name=arduino" })

const interval = setInterval(function () {
  // method to be executed;
  const val = document.getElementById('sendValue').value
  socket.emit('velocity', val)
}, 50);
