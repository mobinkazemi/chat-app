import Conversation from '../models/conversations.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id
        const { content } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            deletedAt: null
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            content
        });

        conversation.messages.push(newMessage._id);
        await conversation.save();

        return res.status(201).json({ _id: newMessage._id })
    } catch (error) {
        console.error('Error in sendMessage controller:', error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getMessages = async (req, res) => {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
        deletedAt: null
    }).populate('messages');

    if (!conversation) {
        return res.status(200).json({ data: [] });
    }


    return res.status(200).json(conversation.messages);

}