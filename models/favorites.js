import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;