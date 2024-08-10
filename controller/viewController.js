import Post from "../models/post.js";
import User from "../models/user.js";

const createView = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        post.views = (post.views || 0) + 1;

        await post.save();

        user.views.push(post);

        await user.save();
        

        res.status(200).json({ 
            message: 'View added successfully', 
            views: post.views 
        });
    } catch (error) {
        console.error('Error while adding view:', error);
        res.status(500).json({ 
            message: 'Failed to add view', 
            error: error.message 
        });
    }
};

export { createView };
