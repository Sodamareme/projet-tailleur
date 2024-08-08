import User from "../models/user.js";
import Post from "../models/post.js";
import Favorite from "../models/favorites.js";

const addToFavorites = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const favorites = await Favorite.find();
        if (!favorites.some(favorite => favorite.user.toString() === userId && favorite.post.toString() === postId)) {
            const favorite = new Favorite({ user: userId, post: postId });
            await favorite.save();
            post.nbFavorites++;
            await post.save();
            return res.status(200).json({ message: 'Post added to favorites successfully', status: true });
        } else {
            removeFavorite(res, userId, post);
        }
    } catch (error) {
        res.status(400).json({ message: 'Failed to add to favorites', error, status: false });
    }
};


const removeFavorite = async (res, userId, post) => {
    const favorite = await Favorite.findOneAndDelete({ user: userId, post: post._id });
    if (favorite) {
        post.nbFavorites--;
        await post.save();
    }  else {
        throw new Error('Favorite not found');
    }
    return res.status(200).json({ message: 'Post deleted to favorites successfully', status: true });
}

export { addToFavorites };
