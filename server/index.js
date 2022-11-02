// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 });

const clients = new Map();

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");

    //Creating users
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };

    clients.set(ws, metadata);

    // sending message
    ws.on("message", messageAsString => {
        console.log(`Client has sent us: ${messageAsString}`);
        const message = JSON.parse(messageAsString);
        const metadata = clients.get(ws);
        message.sender = metadata.id;
        message.color = metadata.color;
        [...clients.keys()].forEach( (client) => {
            client.send(JSON.stringify(message));
        });
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
        clients.delete(ws);
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

console.log("The WebSocket server is running on port 8080");
