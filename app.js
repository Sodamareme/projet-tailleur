import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './database/connexion-db.js';
import RoleRouter from './route/roleRoute.js';
import UserRouter from './route/userRoute.js';
import PostRouter from './route/postRoute.js';

import CommentRouter from './route/commentRoute.js';

import LikeRouter from './route/likeRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;
const uri = process.env.URI;
dbConnect(mongo_uri);


app.use(express.json());

app.use(`${uri}/role`, RoleRouter);
app.use(`${uri}/user`, UserRouter);
app.use(`${uri}/post`, PostRouter);
app.use(`${uri}/comment`, CommentRouter);
app.use(`${uri}`, LikeRouter);


app.listen(port, () => console.log(`Your application is started on http://www.beyond-fashion.com:${port}`));