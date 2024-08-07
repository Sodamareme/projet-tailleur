import User from "../models/user.js";
import Post from "../models/post.js";

const addToFavorites = async (req, res) => {
    try {
        const { id: postId } = req.params; // Récupérer postId depuis les paramètres d'URL
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!user.favorites.includes(postId)&& !post.favorites.includes(postId)) {
            user.favorites.push(postId);
            post.favorites.push(postId);
            await user.save();
            await post.save();
            return res.status(200).json({ message: 'Post added to favorites', status: true });
        } else {
            return res.status(400).json({ message: 'Post is already in favorites', status: false });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to add to favorites', error, status: false });
    }
};


const removeFromFavorites = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favorites.includes(postId)) {
            user.favorites = user.favorites.filter(id => id.toString() !== postId);
            await user.save();
            return res.status(200).json({ message: 'Post removed from favorites', status: true });
        } else {
            return res.status(400).json({ message: 'Post is not in favorites', status: false });
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to remove from favorites', error, status: false });
    }
};

export { addToFavorites, removeFromFavorites };
