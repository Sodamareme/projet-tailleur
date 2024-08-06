
import mongoose from 'mongoose';


const dbConnect = (mongo_uri) => {
    mongoose.connect(mongo_uri)
    .then(() => console.log('Connexion réussie'))
    .catch(error => console.error('Erreur de connexion à MongoDB:', error));
}

export default dbConnect;