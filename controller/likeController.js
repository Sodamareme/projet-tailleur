import Like from '../models/like.js';
import Dislike from '../models/dislike.js';
import Post from '../models/post.js';
import Notification from '../models/notification.js'; // Import the Notification model
import User from '../models/user.js';
const removeExistingReaction = async (Model, post, user) => {
    const existingReaction = await Model.findOne({ post, user });
    if (existingReaction) {
        console.log('Removing existing reaction:');
        await existingReaction.deleteOne();
        return existingReaction._id;
    }
    return null;
};

const updatePostLikes = async (postId, likeId, action) => {
    try {
        if (action === 'add') {
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: likeId } }, { new: true });
        } else if (action === 'remove') {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: likeId } }, { new: true });
        }
    } catch (error) {
        console.error(`Error updating post after like ${action}:`, error);
    }
};

const updatePostDislikes = async (postId, dislikeId, action) => {
    try {
        if (action === 'add') {
            await Post.findByIdAndUpdate(postId, { $addToSet: { dislikes: dislikeId } }, { new: true });
        } else if (action === 'remove') {
            await Post.findByIdAndUpdate(postId, { $pull: { dislikes: dislikeId } }, { new: true });
        }
    } catch (error) {
        console.error(`Error updating post after dislike ${action}:`, error);
    }
};

const createNotification = async (postId, userId,Model) => {
    try {
         userId= await Model.findOne({post,user})
         postId = await Post.findById(postId).populate('author'); // Assuming 'author' field references the post's author
          // The user who should receive the notification
        let message;

        switch (Model) {
            case 'Like':
                message = `${userId} liked your post.`;
                break;
            case 'Dislike':
                message = `${userId} disliked your post.`;
                break;
            default:
                message = `${userId} interacted with your post.`;
        }

        const notification = new Notification({
            postId,
            userId,
            type:Model,
            message,
        });

        await notification.save();
        await User.findByIdAndUpdate(authorId, { $push: { notifications: notification._id } });

    } catch (error) {
        console.error(`Error creating ${actionType} notification:`, error);
    }
};
const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const existingLikeId = await removeExistingReaction(Like, postId, userId);
        if (existingLikeId) {
            await updatePostLikes(postId, existingLikeId, 'remove');
            return res.status(200).json({ message: 'Like removed', liked: false });
        }

        const existingDislikeId = await removeExistingReaction(Dislike, postId, userId);
        if (existingDislikeId) {
            await updatePostDislikes(postId, existingDislikeId, 'remove');
        }

        const like = new Like({ post: postId, user: userId });
        await like.save();
        await updatePostLikes(postId, like._id, 'add');

        // Create notification for the like
        await createNotification(postId, userId, Like);

        res.status(200).json({ message: 'Post liked successfully', liked: true });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(400).json({ message: 'Failed to like post', error });
    }
};

const dislikePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const existingDislikeId = await removeExistingReaction(Dislike, postId, userId);
        if (existingDislikeId) {
            await updatePostDislikes(postId, existingDislikeId, 'remove');
            return res.status(200).json({ message: 'Dislike removed', disliked: false });
        }

        const existingLikeId = await removeExistingReaction(Like, postId, userId);
        if (existingLikeId) {
            await updatePostLikes(postId, existingLikeId, 'remove');
        }

        const dislike = new Dislike({ post: postId, user: userId });
        await dislike.save();
        await updatePostDislikes(postId, dislike._id, 'add');

        // Create notification for the dislike
        await createNotification(postId, userId, Dislike);

        res.status(200).json({ message: 'Post disliked successfully', disliked: true });
    } catch (error) {
        console.error('Error disliking post:', error);
        res.status(400).json({ message: 'Failed to dislike post', error });
    }
};

export { likePost, dislikePost };
 