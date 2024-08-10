import notification from '../models/notification.js';

export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};
