require('dotenv').config();
const express = require('express');
const app = express();
const {router} = require('./router/router')
const cors = require('cors'); // Correct import
const mongoose = require('mongoose')
const { createServer } = require( "http");
const { Server } = require( "socket.io");
const setupnotifationSocketEvents = require('./router/soketio.router')
const setupchatsocketEvents = require('./router/userchatsoket.router');
const { Chatrouting } = require('./router/Chatrouting');


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:
    {
        origin:"*"
    }
  // options
});



app.use(cors({
    origin:"*"
})); // Use cors() middleware
app.use(express.urlencoded({ extended: false }));

app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json());
mongoose.connect(process.env.Mongooseurl).then(()=>
{
console.log("succesfully connected db");
}).catch(()=>{
    console.log("error in db");
})

app.set('socketio', io);
setupnotifationSocketEvents(io);
setupchatsocketEvents(io);

app.use(router)
app.use(Chatrouting)




  


const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log("server start at ", PORT);
});
