var io = require('socket.io').listen(80),
  fs = require('fs'),
  path = require('path'),
  appDir = path.dirname(require.main.filename),
  request = require("request");

function init() {
  io.sockets.on('connection', function(socket) {

    socket.on('save file', function(e) {
      var fullPath = appDir + '/' + e.fileName;
      fs.writeFile(fullPath, e.content, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file ' + fullPath + ' was saved!');
      });
    });

    socket.on('load page', function(e) {
      request({
        uri: e.url,
      }, function(error, response, body) {
        socket.emit('load page result', body);
        console.log('body sended');
      });
    });
  });
  console.log('listening...');
}

init();
