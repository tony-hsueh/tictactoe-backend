const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const io = new Server(server, { 
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
  } 
});

app.get('/',(req, res) => {
  res.send('hello you');
})

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('record', (data, whichPlayer) => {
      socket.broadcast.emit('new', data, whichPlayer);
  })

  socket.on('disconnect', () => {
      console.log('User disconnect');
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log('tictactoe server is on')
})