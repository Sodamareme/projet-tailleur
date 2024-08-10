/* import Post from "../models/post.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";



const createNotification = (Model) => {
    return async (req, res, next) => {
        try {
            let { postId } = req.params;

            if (!postId) {
                postId = req.body.postId;
            }
            const userId = req.userId; 

            const post = await Post.findById(postId).populate('author'); 
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            let message;

            switch (Model) {
                case 'Like':
                    message = `${userId} liked your post.`;
                    break;
                case 'Dislike':
                    message = `${userId} disliked your post.`;
                    break;
                case 'Rate':
                    message = `User ${userId} rated your post: ${postId}`;
                    break;
                case 'Comment':
                    message = `${userId} commented your post:${postId}`;
                    break;
                case 'Follow':
                    message = `${userId} Follow your`;
                    break;
                case 'Report':
                    message = `${userId} report your post:${postId}`;
                    break;
                default:
                    message = `${userId} interacted with your post:${postId}`;
            }

            const notification = new Notification({
                postId: post._id,
                userId: userId, 
                type: Model,
                message,
            });

            await notification.save();
            await User.findByIdAndUpdate(post.author._id, { $push: { notifications: notification._id } });

            next(); 
        } catch (error) {
            console.error(`Error creating ${Model} notification:`, error);
            res.status(500).json({ message: `Error creating ${Model} notification.` });
        }
    };
};
 const NotifDeletePost = (Model) => {
    return async (req, res, next) => {
        try {
            let { postId } = req.params;

            if (!postId) {
                postId = req.body.postId;
            }
            const userId = req.userId; 

            const post = await Post.findById(postId).populate('author'); 
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            let message;

            switch (Model) {
                case 'DeletePost':
                    message = `Your post: ${postId} deleted because y've 3 or more reports`;
                    break;
                default:
                    message = `${userId} interacted with your post:${postId}`;
            }

            const notification = new Notification({
                postId: post._id,
                userId: userId, 
                type: Model,
                message,
            });

            await notification.save();
            await User.findByIdAndUpdate(post.author._id, { $push: { notifications: notification._id } });

            next(); 
        } catch (error) {
            console.error(`Error creating ${Model} notification:`, error);
            res.status(500).json({ message: `Error creating ${Model} notification.` });
        }
    };
};

export {NotifDeletePost,createNotification}; */