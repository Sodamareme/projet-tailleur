import User from "../models/user.js";
import Statue from "../models/statue.js";

const createStatue = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId).populate('roles').exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hasTailorRole = user.roles.some(role => role.name === 'TAILOR');
        if (!hasTailorRole) {
            return res.status(403).json({ message: 'User does not have the required role' });
        }

        const newStatue = new Statue({ content, author: userId });
        const savedStatue = await newStatue.save();

        res.status(201).json({ message: 'Statue saved successfully', statue: savedStatue, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to save statue', error, status: false });
    }
};

const deleteStatue = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const statue = await Statue.findById(id);
        if (!statue) {
            return res.status(404).json({ message: 'Statue not found' });
        }

        if (statue.author.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        await statue.deleteOne();
        res.status(200).json({ message: 'Statue deleted successfully', status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete statue', error, status: false });
    }
};

// Suppression de tous les statuts
const deleteAllStatues = async (req, res) => {
    try {
        const result = await Statue.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} statues deleted successfully`, status: true });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete all statues', error, status: false });
    }
};

// Suppression des statuts expirés
const deleteExpiredStatues = async () => {
    try {
        const now = new Date();
        const result = await Statue.deleteMany({ expires_at: { $lt: now } });
        console.log(`${result.deletedCount} expired statues deleted.`);
    } catch (error) {
        console.error('Error deleting expired statues:', error);
    }
};

// Exécution de la suppression des statues expirés toutes les heures
setInterval(deleteExpiredStatues, 60 * 60 * 1000);  // 60 minutes * 60 secondes * 1000 millisecondes

export { createStatue, deleteStatue, deleteAllStatues };
