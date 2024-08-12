import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIO } from 'socket.io';
import dbConnect from './database/connexion-db.js';
import RoleRouter from './route/roleRoute.js';
import UserRouter from './route/userRoute.js';
import PostRouter from './route/postRoute.js';
import FavoriteRouter from './route/favoriteRoute.js';
import RateRouter from './route/rateRoute.js';
import CommentRouter from './route/commentRoute.js';
import LikeRouter from './route/likeRoute.js';
import StatueRouter from './route/statueRoute.js';
import viewRouter from './route/viewRoute.js';
import blockRouter from './route/blockRoute.js';
import MessageRouter from './route/messageRouter.js';
import RechargeRouter from './route/rechargeRoute.js';
import MesureRouter from './route/mesureRoute.js';

import swaggerdocs from './utils/swagger.js'; // Import the swaggerSpec
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;   
const uri = process.env.URI;
dbConnect(mongo_uri);

app.use(express.json());
/* app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); */
app.use(`${uri}/role`, RoleRouter);
app.use(`${uri}/user`, UserRouter);
app.use(`${uri}/post`, PostRouter);
app.use(`${uri}/favorite`, FavoriteRouter);
app.use(`${uri}/rate`, RateRouter);
app.use(`${uri}/comment`, CommentRouter);
app.use(`${uri}/Reaction`, LikeRouter);
app.use(`${uri}/statue`, StatueRouter);
app.use(`${uri}/view`, viewRouter);
app.use(`${uri}/block`, blockRouter);
app.use(`${uri}/message`, MessageRouter);
app.use(`${uri}/recharge`, RechargeRouter);
app.use(`${uri}/mesure`, MesureRouter);

const server = http.createServer(app);
const io = new SocketIO(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('send message', (messageData) => {
        io.to(messageData.receiverId).emit('receive message', messageData);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
swaggerdocs(app,port);
server.listen(port, () => {
    console.log(`Your application is started on http://www.beyond-fashion.com:${port}`);
});
