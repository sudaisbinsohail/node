import jwt from 'jsonwebtoken';

const userSockets = new Map();

const handleSocketConnections = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.headers?.token;
        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }
        jwt.verify(token, "fghkdskljirtyuifgycdkedkfudghdw", (err, decoded) => {
            if (err) {
                return next(new Error('Authentication error: Invalid token'));
            }
            socket.user = decoded;
            socket.userId = decoded.id;
            userSockets.set(socket.userId, socket.id);
            next();
        });
    });

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            if (socket.userId) {
                userSockets.delete(socket.userId);
                console.log(`User ${socket.userId} disconnected`);
            }
        });

        socket.on("private-message", ({ targetUserId, msg }) => {
            const targetSocketId = userSockets.get(targetUserId);
            if (targetSocketId) {
                io.to(targetSocketId).emit('private-message', msg);
            } else {
                console.log('Target user not connected:', targetUserId);
            }
        });
    });
};

export  {handleSocketConnections};
