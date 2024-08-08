import User from "../models/user.js";
import Post from "../models/post.js";

const createPost = async (req, res) => {

    try{
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
        res.status(201).json({ message: 'Post saved successfully',  post: savedPost, status: true})
    }catch(error){
        res.status(400).json({ message: 'Failed to save post', error, status: false })
    }
};

export { createPost}

