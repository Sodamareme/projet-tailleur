import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema({
    recipientId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

const Share = mongoose.model('Share', ShareSchema);

export default Share;