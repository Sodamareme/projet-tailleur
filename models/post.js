import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    description: { type: String, maxLength: 800},
    status: { type: Boolean, default: true },
    views: { type: Number, default: 0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published_at: { type: Date, default: Date.now },
    nbFavorites: { type: Number, default: 0 },
    rates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rate' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dislike' }],
    reports: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String, required: true }
    }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;
