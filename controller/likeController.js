import Like from '../models/like.js';
import Dislike from '../models/dislike.js';
import Post from '../models/post.js';

const removeExistingReaction = async (Model, post, user) => {
    const existingReaction = await Model.findOne({ post, user });
    if (existingReaction) {
        console.log('Removing existing reaction:');
        await existingReaction.deleteOne();
        return existingReaction._id; // Return the ID of the removed reaction
    }
    return null;
};

const updatePostLikes = async (postId, likeId, action) => {
    try {
        if (action === 'add') {
            const postUpdate = await Post.findByIdAndUpdate(postId, { $addToSet: { likes: likeId } }, { new: true });
            console.log('Post updated after like:');
        } else if (action === 'remove') {
            const postUpdate = await Post.findByIdAndUpdate(postId, { $pull: { likes: likeId } }, { new: true });
            console.log('Post updated after like removal:');
        }
    } catch (error) {
        console.error(`Error updating post after like ${action}:`, error);
    }
};

const updatePostDislikes = async (postId, dislikeId, action) => {
    try {
        if (action === 'add') {
            const postUpdate = await Post.findByIdAndUpdate(postId, { $addToSet: { dislikes: dislikeId } }, { new: true });
            console.log('Post updated after dislike:', postUpdate);
        } else if (action === 'remove') {
            const postUpdate = await Post.findByIdAndUpdate(postId, { $pull: { dislikes: dislikeId } }, { new: true });
            console.log('Post updated after dislike removal:');
        }
    } catch (error) {
        console.error(`Error updating post after dislike ${action}:`, error);
    }
};

const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        // Remove existing like if it exists
        const existingLikeId = await removeExistingReaction(Like, postId, userId);
        if (existingLikeId) {
            await updatePostLikes(postId, existingLikeId, 'remove');
            return res.status(200).json({ message: 'Like removed', liked: false });
        }

        // Remove existing dislike if it exists
        const existingDislikeId = await removeExistingReaction(Dislike, postId, userId);
        if (existingDislikeId) {
            await updatePostDislikes(postId, existingDislikeId, 'remove'); 
        }

        // Add new like
        const like = new Like({ post: postId, user: userId });
        await like.save();
        await updatePostLikes(postId, like._id, 'add');
        sendNotification(userId, postId, 'like');
        res.status(200).json({ message: 'Post liked successfully', liked: true });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(400).json({ message: 'Failed to like post', error });
    }
};

// fonction de notifications
const sendNotification = async (userId, postId, type) => {
    try {
        // Récupération des utilisateurs à notifier
        const usersToNotify = await User.find({ _id: { $ne: userId } });

        // Envoi de notifications
        for (const user of usersToNotify) {
            const notification = new Notification({
                user: user._id,
                post: postId,
                type,
            });
            await notification.save();
        }
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
};

    

// fonction de notifications quand on dislike un po

const dislikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        // Remove existing dislike if it exists
        const existingDislikeId = await removeExistingReaction(Dislike, postId, userId);
        if (existingDislikeId) {
            await updatePostDislikes(postId, existingDislikeId, 'remove');
            return res.status(200).json({ message: 'Dislike removed', disliked: false });
        }

        // Remove existing like if it exists
        const existingLikeId = await removeExistingReaction(Like, postId, userId);
        if (existingLikeId) {
            await updatePostLikes(postId, existingLikeId, 'remove');
        }

        // Add new dislike
        const dislike = new Dislike({ post: postId, user: userId });
        await dislike.save();
        await updatePostDislikes(postId, dislike._id, 'add');
        res.status(200).json({ message: 'Post disliked successfully', disliked: true });
    } catch (error) {
        console.error('Error disliking post:', error);
        res.status(400).json({ message: 'Failed to dislike post', error });
    }
};

export { likePost, dislikePost };
