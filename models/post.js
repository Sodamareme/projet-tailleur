import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    description: { type: String, maxLength: 800 },
    status: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dislike' }],
    published_at: { type: Date, default: Date.now }
});

postSchema.post('updateOne', function (doc) {
    console.log('Post updated:', doc);
});

const Post = mongoose.model("Post", postSchema);

export default Post;
