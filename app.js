import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './database/connexion-db.js';
import RoleRouter from './route/roleRoute.js';
import UserRouter from './route/userRoute.js';
import PostRouter from './route/postRoute.js';

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
app.use(`${uri}/post`, PostRouter); // pour le getAllPots
app.use(`${uri}/post`, PostRouter); // pour update un post 
app.use(`${uri}/post`, PostRouter); // pour delete un post
app.use(`${uri}/post`, PostRouter); // pour share un post
app.use(`${uri}/post`, PostRouter); // pour desable-share un post


app.listen(port, () => console.log(`Your application is started on http://www.serigne.sn::${port}`));