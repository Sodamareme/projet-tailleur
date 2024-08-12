import User from "../models/user.js";

const UserBlocked = async (req, res) => {
    try {
        const userId = req.userId;
        const blockedUserId = req.params.blockedUserId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const blockedUser = await User.findById(blockedUserId);
        
        if (!blockedUser) {
            return res.status(404).json({ message: 'Blocked user not found' });
        }

        if (user.UserBlocked.includes(blockedUserId)) {
            return res.status(400).json({ message: 'User is already blocked' });
        }

        user.UserBlocked.push(blockedUserId);

        await user.save();

        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error('Error while blocking user:', error);
        res.status(500).json({ 
            message: 'Failed to block user', 
            error: error.message 
        });
    }
};

export { UserBlocked };