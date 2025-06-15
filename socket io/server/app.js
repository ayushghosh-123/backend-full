import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

// Create HTTP server using the express app
const httpServer = createServer(app);

// Attach socket.io to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// Define a route
app.get("/", (req, res) => {
    res.send("hello physics");
});

// Listen for socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    console.log("Id", socket.id);

    // Send welcome messages
    socket.emit("welcome", "Welcome to the server");
    socket.broadcast.emit("welcome", `${socket.id} joined the server`);

    // Handle disconnect event
    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
    });

    socket.on("message", (data) => {
        console.log(data)
        io.emit("receive-message", data)
    }
    )
});

// Start the server
httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});

