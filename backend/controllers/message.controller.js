import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await conversation.save();
        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}


// const receiverId = mongoose.Types.ObjectId(receiverObjectId);
// const senderId = mongoose.Types.ObjectId(senderObjectId);

// let conversation = await Conversation.findOne({
//     participants: { $all: [senderObjectId, receiverObjectId] },
// });

// if (!conversation) {
//     conversation = await Conversation.create({
//         participants: [senderObjectId, receiverObjectId],
//     });
// }