import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    description: { type: String, maxLength: 800},
    status: { type: Boolean, default: true },
    views: { type: Number, default: 0},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published_at: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]  // Array of comment IDs  // Array of comment documents  // Embedded documents  // Embedded arrays  // References to other documents  // References to other documents in different collections  // References to other documents using a custom field name  // References to other documents using a custom field name and a custom ID field  // References to other documents using a custom field name and a custom ID field with a default
});

const Post = mongoose.model("Post", postSchema);

export default Post;