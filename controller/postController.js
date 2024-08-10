import User from "../models/user.js";
import Post from "../models/post.js";
import Share from "../models/share.js";
import Favorite from "../models/favorites.js";
import Like from "../models/like.js";
import Dislike from "../models/dislike.js";
import Rate from "../models/rate.js";
import Comment from "../models/comment.js";
import { createNotification } from './notificationController.js';
import { sendMail } from "../utils/utils.js";   



const createPost = async (req, res) => {
    try {
        const { content, description } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId).populate('roles').exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hasTailorRole = user.roles.some(role => role.name === 'TAILOR');
        if (!hasTailorRole) {
            return res.status(403).json({ message: 'User does not have the required role' });
        }

        const newPost = new Post({ content, description, author: userId });
        const savedPost = await newPost.save();
        res.status(201).json({ message: 'Post saved successfully', post: savedPost, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to save post', error, status: false });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: true }).populate('author').exec();
        res.status(200).json({ message: 'Posts fetched successfully', posts, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch posts', error, status: false });
    }
};

const updatePost = async (req, res) => {
    try {
        const { content, description } = req.body;
        const postId = req.params.id;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'User does not have the required permissions to update this post' });
        }

        post.content = content;
        post.description = description;
        const updatedPost = await post.save();

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update post', error, status: false });
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.userId;
    if(genericDeletePost(postId, userId)){
        res.status(200).json({ message: 'Post deleted successfully', status: true });
    }else{
        res.status(400).json({ message: 'Failed to delete post', status: false });
    }
    
};

/*async function genericDeletePost(res, postId, userId){
    try{
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'User does not have the required permissions to delete this post' });
        }

        await Favorite.deleteMany({ post: postId });
        await Comment.deleteMany({ post: postId });
        await Like.deleteMany({ post: postId });
        await Dislike.deleteMany({ post: postId });
        await Rate.deleteMany({ post: postId });

        const postAuteur = Post.findById(postId).populate('author');
        const connectedUser = await User.findById(userId);

        if (!postId || !postAuteur || !connectedUser) {
            return res.status(400).json({ message: 'Failed to retrieve post or user information' });
        }
        const message = `Votre post:${postId} a ete supprimé aprés 3 signalements`;
        createNotification(message, postAuteur._id);
        await post.deleteOne();

        return res.status(200).json({ message: 'Post and associated references deleted successfully', status: true });
    }catch (error) {
        console.error('Error deleting post:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Erreur lors de la suppression du post.' });
        }
    }
    
}*/

async function genericDeletePost(postId, userId) {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            console.error('Post not found');
            return false;
        }

        if (post.author.toString() !== userId.toString()) {
            console.error('User does not have the required permissions to delete this post');
            return false;
        }

        await Favorite.deleteMany({ post: postId });
        await Comment.deleteMany({ post: postId });
        await Like.deleteMany({ post: postId });
        await Dislike.deleteMany({ post: postId });
        await Rate.deleteMany({ post: postId });
        
        await post.deleteOne();

        console.log('Post and associated references deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        return false;
    }
}


const sharePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const recipientId = req.body.recipientId;

        if (!recipientId) {
            return res.status(400).json({ message: 'Recipient user ID is required' });
        }

        if (recipientId === userId) {
            return res.status(400).json({ message: 'Cannot share post to yourself' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({ message: 'Recipient user not found' });
        }

        const newShare = new Share({
            recipientId: recipientId,
            user: userId,
            posts: [postId],
        });
        await newShare.save();

        res.status(200).json({ message: 'Post shared successfully', status: true });
    } catch (error) {
        console.error('Error sharing post:', error);
        res.status(400).json({ message: 'Failed to share post', error: error.message, status: false });
    }
};

const disableShareButton = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'User does not have the required permissions to disable share button' });
        }

        post.status = false;
        const updatedPost = await post.save();

        res.status(200).json({ message: 'Share button disabled successfully', post: updatedPost, status: true });
    } catch (error) {
        console.error('Error disabling share button:', error);
        res.status(400).json({ message: 'Failed to disable share button', error: error.message, status: false });
    }
};

const reportPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        const { reason } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Prevent the author from reporting their own post
        if (post.author.toString() === userId.toString()) {
            return res.status(403).json({ message: 'You cannot report your own post' });
        }
        /* 
        const alreadyReported = post.reports.some(report => report.userId.toString() === userId.toString());
    
        if (alreadyReported) {
            return res.status(403).json({ message: 'You have already reported this post' });
        }*/

        const postAuteur = Post.findById(postId).populate('author');
        const connectedUser = await User.findById(userId);

        if (!postId || !postAuteur || !connectedUser) {
            return res.status(400).json({ message: 'Failed to retrieve post or user information' });
        }

        const message = `${connectedUser.firstname} ${connectedUser.lastname} vient de signaler votre post`;
        createNotification(message, postAuteur._id);
        // Add the report to the reports array
        post.reports.push({ userId, reason });

        if(post.reports.length === 2){
            const subject = 'Your post has been reported twice';
            const message = 'Your post has been reported twice, it will be deleted when it reaches 4 reports.';
            const author = await User.findById(post.author); 
            await sendMail(author.email, subject, message);
        }
        // Delete the post if the number of reports reaches 3
        if (post.reports.length > 3) {
            if(genericDeletePost(post._id.toString(), post.author.toString())){
                res.status(200).json({ message: 'Post reported successfully', status: true });
            }else{
                res.status(400).json({ message: 'Failed to report post', status: false });
            }
        }else{
            await post.save();
            res.status(200).json({ message: 'Post reported successfully', status: true });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Failed to report post', error: error.message, status: false });
    }
};


export { createPost, getAllPosts, updatePost, deletePost, sharePost, disableShareButton, reportPost };
