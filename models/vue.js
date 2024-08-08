import mongoose from "mongoose";

const VueSchema = new mongoose.Schema({
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

const Vue = mongoose.model('Share', VueSchema);

export default Vue;