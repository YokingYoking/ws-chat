const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

io.on('connection', (socket) => {
  console.log('user[ ' + socket.id +' ]connected');
  socket.emit('system', 'user[ ' + socket.id +' ]connected');
  socket.on('message', (data) => {
    console.log('receive message[ ' + data.msg + ' ] from user[ ' + data.username + ' ]')
    socket.emit('message', data)
  });
});

io.listen(7070);

module.exports = app;
