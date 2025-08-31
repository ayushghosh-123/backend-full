import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
const server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});
const wss = new WebSocketServer({ server });
let usercount = 0;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data, isbinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isbinary });
            }
        });
    });
    console.log("user connected", ++usercount);
    ws.send('Hello! Message From Server!!');
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});
//# sourceMappingURL=index.js.map