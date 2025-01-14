
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('joinDocument', (documentId) => {
        socket.join(documentId);
        console.log(`A user joined document ${documentId}`);
    });

    socket.on('documentUpdate', ({ documentId, title, content }) => {
        socket.to(documentId).emit('receiveUpdate', { title, content });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));