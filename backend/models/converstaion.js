const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
participants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
],
messages: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
]
}, {
    timestamps: true,
});

const conversation = mongoose.model('Conversation', conversationSchema);
module.exports = conversation;