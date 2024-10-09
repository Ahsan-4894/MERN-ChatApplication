import mongoose, { Schema, Types, model} from "mongoose";

const chatSchema = new Schema({
  name: { type: String, required: true },  
  groupChat: { type: Boolean, default:false },
  creator:{
    type: Types.ObjectId,
    ref:"User"
  },
  members: {
    type: [{type:Types.ObjectId, ref:"User"}],
  },

}, { timestamps: true }); // this line will add two fields to the schema - "createdAt" and "updatedAt" - which will be automatically updated when the document is created or updated.


//if the model "Chat" already exists in the mongoose models, use that, otherwise create a new one using the userSchema
export const chatModel = mongoose.models.chatSchema || model("Chat", chatSchema);
