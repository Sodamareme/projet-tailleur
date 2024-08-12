
import { request } from 'express';
import Comment from '../models/comment.js';
import Post from '../models/post.js';
import User from '../models/user.js';
import { createNotification } from './notificationController.js';


const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const author = req.userId;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: `Post with ${postId} does not found`, status: false });
        }

        const postAuteur = Post.findById(postId).populate('author');
        const connectedUser = await User.findById(author);

        if (!postId || !postAuteur || !connectedUser) {
            return res.status(400).json({ message: 'Failed to retrieve post or user information' });
        }

        const message = `${connectedUser.firstname} ${connectedUser.lastname} vient de commenter votre post`;
        createNotification(message, postAuteur._id);



        const comment = new Comment({
            content,
            author,
            post: postId
        });

        const savedComment = await comment.save();
        post.comments.push(savedComment._id);
        await post.save();
        res.status(201).json({ message: 'Comment added successfully', comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error while adding comment', error });
    }
};

const deleteComment = async (req, res) => {
    try {
        const idComment = req.params.commentId;
        const comment = await Comment.findById(idComment);

        if (!comment) {
            return res.status(404).json({ message: `Comment with id ${idComment} not found`, status: false });
        }
        
        const postFromDB = await Post.findById(comment.post);
        if (!postFromDB) {
            return res.status(404).json({ message: `Post associated with comment not found`, status: false });
        }

        // Vérifier si le commentaire appartient à l'utilisateur connecté et si il est le créateur du post
        if (comment.author.toString() === req.userId.toString() || postFromDB.author.toString() === req.userId.toString()) {
            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: idComment } }, { new: true });

            await comment.deleteOne();

            res.status(200).json({ message: 'Comment deleted successfully' });
        }else{
            return res.status(401).json({ message: 'You are not allowed to delete this comment', status: false });
        }

    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error while deleting comment', error: error.message });
    }
};


const updateComment = async (req, res) => {
    try {
        
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        comment.content = content;

        await comment.save();
        res.status(200).json({ message: 'Comment updated successfully', comment, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

export { createComment, deleteComment, updateComment };
