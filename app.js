import express from 'express';
import dotenv from 'dotenv';
import http from 'http'; // Import http module to create the server
import { Server as SocketIO } from 'socket.io'; // Import Socket.IO
import dbConnect from './database/connexion-db.js';
import RoleRouter from './route/roleRoute.js';
import UserRouter from './route/userRoute.js';
import PostRouter from './route/postRoute.js';
import FavoriteRouter from './route/favoriteRoute.js';
import RateRouter from './route/rateRoute.js';
import CommentRouter from './route/commentRoute.js';
import LikeRouter from './route/likeRoute.js';
import StatueRouter from './route/statueRoute.js';
/* import NotificationRouter from './route/notificationRoute.js' */
import viewRouter from './route/viewRoute.js';
import blockRouter from './route/blockRoute.js';
import MessageRouter from './route/messageRouter.js';
import RechargeRouter from './route/rechargeRoute.js';
import MesureRouter from './route/mesureRoute.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;   
const uri = process.env.URI;
dbConnect(mongo_uri);

app.use(express.json());

app.use(`${uri}/role`, RoleRouter); // pour creer un role
app.use(`${uri}/user`, UserRouter); // Pourcreer un user
app.use(`${uri}/post`, PostRouter); // Pour creer un post
app.use(`${uri}/favorite`, FavoriteRouter);
app.use(`${uri}/rate`, RateRouter);
app.use(`${uri}/comment`, CommentRouter);
app.use(`${uri}`, LikeRouter);
app.use(`${uri}/statue`, StatueRouter);
/* app.use(`${uri}`, NotificationRouter); */
app.use(`${uri}/view`, viewRouter);
app.use(`${uri}/block`, blockRouter);
app.use(`${uri}/message`, MessageRouter);
app.use(`${uri}/recharge`, RechargeRouter);
app.use(`${uri}/mesure`, MesureRouter);


// Create an HTTP server and bind it with Socket.IO
const server = http.createServer(app);
const io = new SocketIO(server);

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('send message', (messageData) => {
        // Emit the message to the target user
        io.to(messageData.receiverId).emit('receive message', messageData);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => { console.log(`Your application is started on http://www.beyond-fashion.com:${port}`);});


//app.listen(port, () => console.log(`Your application is started on http://www.beyond-fashion.com:${port}`));

