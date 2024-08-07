import mongoose from 'mongoose';

const dislikeSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Dislike = mongoose.model('Dislike', dislikeSchema);

export default Dislike;
