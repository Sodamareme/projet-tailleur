import Message from '../models/message.js';

export const createMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  const senderId = req.userId;

  try{
    const newMessage = new Message({ senderId, receiverId, content });
    await newMessage.save();
    
    res.status(201).json({ message: 'Message sent successfully', message: newMessage, status: true });
  }catch(error){
    res.status(500).json({ message: 'Error sending message', error, status: false });
  }
};

export const getMessages = async (req, res) => {
  try{
    const messages = await Message.find({ $or: [{ senderId: req.userId }, { receiverId: req.userId }] }).populate('senderId').populate('receiverId');
    res.status(200).json({ message: 'Messages fetched successfully', messages, status: true });
  }catch(error){
    res.status(500).json({ message: 'Error fetching messages', error, status: false });
  }
};
