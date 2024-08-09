
import Comment from '../models/comment.js';
import Post from '../models/post.js';

const createComment = async (req, res) => {
    try {
        const { content, postId } = req.body;
        const author = req.userId;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: `Post with ${postId} does not found`, status: false });
        }

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
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

const deleteComment = async (req, res) => {
    try {
        const idComment = req.params.commentId;
        const comment = await Comment.findById(idComment);

        console.log(comment);

        if (!comment) {
            return res.status(404).json({ message: `Comment with id ${idComment} not found`, status: false });
        }

        const postFromDB = await Post.findById(comment.post);
        if (!postFromDB) {
            return res.status(404).json({ message: `Post associated with comment not found`, status: false });
        }

        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: idComment } }, { new: true });

        // Supprimer le commentaire de la base de données (optionnel, si nécessaire)
        await comment.deleteOne();

        res.status(200).json({ message: 'Comment deleted successfully' });

    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
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

        if (comment.author.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        comment.content = content;
        await comment.save();
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

export { createComment, deleteComment, updateComment };
