const Conversation = require('../models/converstaion');
const Message = require('../models/messages');

async function sendMessage(req, res) {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const { message } = req.body;

        // Find existing conversation or create a new one
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [], // Initialize messages array
            });
        }

        // Create and save new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // Return the newly created message in the response
        res.status(200).json({ success: true, data: newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMessages(req, res) {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find existing conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate('messages');

        if (!conversation) {
            return res.status(404).json({ success: false, msg: 'Conversation not found' });
        }

        res.status(200).json({ success: true, data: conversation.messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { sendMessage, getMessages };
