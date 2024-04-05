import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants:[
            {
                type: mongoose.Schema.Types.ObjectId,  
                ref:"User"
            },
            
        ],
        messages:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Message", // Message model will be referenced here
                default:[],
            },
        ],   
    },
    {timestamps:true} 

);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;