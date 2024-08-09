import Rate from '../models/rate.js';
import Post from '../models/post.js';
import User from '../models/user.js';

export const createRate = async (req, res) => {
    try {
        const { stars, description, postId } = req.body;
        const userId = req.userId; 

        if(Number(stars)<=2 && !description){
            return res.status(400).json({ message: "Description is required because your rate is 2 stars or less" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const existingRate = await Rate.findOne({ user: userId, post: postId });
        if (existingRate) {
            return res.status(400).json({ message: "You have already rated this post" });
        }

        const rate = new Rate({
            stars,
            description,
            post: postId,
            user: userId
        });

        const savedRate = await rate.save();

        post.rates.push(savedRate._id);  
        
        await post.save();

        res.status(201).json({ message: "Post rated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const allRates = async (req, res) => {
    try {
        const rates = await Rate.find().populate('post').populate('user', 'username');
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRate = async (req, res) => {
    try {
        const { stars, description } = req.body;
        const rateId = req.params.id;
        const userId = req.userId;

        const rate = await Rate.findById(rateId);
        if (!rate) {
            return res.status(404).json({ message: "Rate not found" });
        }

        if (rate.user.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this rate" });
        }

        rate.stars = stars;
        rate.description = description;

        const updatedRate = await rate.save();
        res.status(200).json({ message: "Rate updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRate = async (req, res) => {
    try {
        const rateId = req.params.id;
        const userId = req.userId;

        const rate = await Rate.findById(rateId);
        if (!rate) {
            return res.status(404).json({ message: "Rate not found" });
        }

        if (rate.user.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this rate" });
        }

        const post = await Post.findById(rate.post);
        post.rates.pull(rate._id);
        await post.save();

        await Rate.deleteOne({ _id: rateId });
        res.status(200).json({ message: "Rate deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};