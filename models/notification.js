import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isRead: {type: Boolean, default: false }
});

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification;
