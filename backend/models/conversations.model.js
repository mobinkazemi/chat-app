import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: []
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: false,
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;