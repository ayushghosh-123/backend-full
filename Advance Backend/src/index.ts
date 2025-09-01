// import WebSocket, { WebSocketServer } from 'ws';
// import http from 'http';

// const server = http.createServer(function(request: any, response: any) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.end("hi there");
// });

// const wss = new WebSocketServer({ server });

// wss.on('connection', function connection(ws) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data, isBinary) {
//     wss.clients.forEach(function each(client) {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(data, { binary: isBinary });
//       }
//     });
//   });

//   ws.send('Hello! Message From Server!!');
// });

// server.listen(3000, function() {
//     console.log((new Date()) + ' Server is listening on port 3000');
// });


// express code 
import express from 'express'
import { WebSocketServer } from 'ws'

const app = express()
const httpServer = app.listen(3000)

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  
  ws.on('message', function message(data, isBinary) {
    // for any typ''e of application use requesthandler to handle the any logical part
      console.log('received %s', data)
  });

  ws.send('Hello! Message From Server!!');
});