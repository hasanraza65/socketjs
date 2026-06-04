const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('chat-message', data => {
    console.log('Received message:', data);
    socket.broadcast.emit('chat-message', data);
  });

  socket.on('message-reacted', data => {
    console.log('Received message reaction:', data);
    socket.broadcast.emit('message-reacted', data);
  });

  socket.on('message-updated', data => {
    console.log('Received message update:', data);
    socket.broadcast.emit('message-updated', data);
  });

  socket.on('message-deleted', data => {
    console.log('Received message delete:', data);
    socket.broadcast.emit('message-deleted', data);
  });

  socket.on('message-replied', data => {
    console.log('Received message reply:', data);
    socket.broadcast.emit('message-replied', data);
  });

  // COMMENT EVENTS

  socket.on('comment-added', data => {
    console.log('Comment added:', data);
    socket.broadcast.emit('comment-added', data);
  });

  socket.on('comment-updated', data => {
    console.log('Comment updated:', data);
    socket.broadcast.emit('comment-updated', data);
  });

  socket.on('comment-deleted', data => {
    console.log('Comment deleted:', data);
    socket.broadcast.emit('comment-deleted', data);
  });

  socket.on('comment-reacted', data => {
    console.log('Comment reacted:', data);
    socket.broadcast.emit('comment-reacted', data);
  });

  socket.on('comment-replied', data => {
    console.log('Comment replied:', data);
    socket.broadcast.emit('comment-replied', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Socket.IO server running on port 3000');
});