import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    description: { type: String, maxLength: 800 },
    status: { type: Boolean, default: true },    
    rates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rate' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dislike' }],
    published_at: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
