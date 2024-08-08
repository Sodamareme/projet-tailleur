import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    description: { type: String, maxLength: 800},
    status: { type: Boolean, default: true },
    views: { type: Number, default: 0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published_at: { type: Date, default: Date.now },
    nbFavorites: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", postSchema);

export default Post;