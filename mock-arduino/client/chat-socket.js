const socket = io('http://localhost:3500', { query: "name=arduino" })

const interval = setInterval(function() {
    // method to be executed;
    const val = document.getElementById('sendValue').value
    socket.emit('velocity', {velocity: val})
  }, 50);
