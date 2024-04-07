module.exports = function(io) {
    // Handle socket connection
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle joining chat room
        socket.on('joinnewchatroom', ({ userId }) => {
            // Add user to connected users
            console.log(`User chat name id ${userId} joined the chat. ${socket.id}`);
            if (userId) {
                socket.join(userId); // Join a specific room identified by the user ID
            } else {
                console.log(`User ID is undefined.`);
            }
        });

        // Handle sending messages
        socket.on('message', ({ recipientId, text,timestamp }) => {
            // Get recipient's socket ID
            console.log("testsis", text, recipientId);

            if (recipientId) {
                io.to(recipientId).emit('message', {text ,timestamp }); // Emit to recipient
            
            } else {
                // Handle if recipient is not connected
                console.log(`User ${recipientId} is not connected.`);
            }
        });

        socket.on('typing', ({ roomId, isTyping }) => {
            console.log("roon id ", roomId , isTyping);
            io.to(roomId).emit('typing', isTyping); // Broadcast typing status to all clients in the same room
          });

        // Handle disconnection
        socket.on('disconnect', () => {
            // Remove user from connected users
            console.log('User chat disconnected:', socket.id);
        });
    });
};
