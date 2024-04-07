// Export a function that sets up Socket.IO event handlers
module.exports = function(io) {
    // Handle socket connection
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
      socket.on('joinCompanyRoom', ({ companyId }) => {
        socket.join(companyId);
        console.log(`User ${socket.id} joined room ${companyId}`);
    });

    socket.on('newJobApplication', ({ companyId, application }) => {
        // Emit the new job application to the corresponding company room
        socket.to(companyId).emit('newJobApplication', application);
    });

      // io.emit('jobCountUpdated', { count: updatedCount });
      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
    
  };
  