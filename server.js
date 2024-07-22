const WebSocket = require('ws');
const port = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: port });

server.on('connection', socket => {
    console.log('New client connected');

    socket.on('message', message => {
        console.log(`Received message: ${message}`);
        // Gửi tin nhắn tới tất cả các client kết nối
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server is running on port ${port}`);
