import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} =req.params;
        const senderId = req.user._id

        let Conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!Conversation) {
            Conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = await Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage) {
            Conversation.messages.push(newMessage._id);
        }
        
    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({error: "Internal server error"});
        // sdaw
        
    }
}