import mongoose, { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    content: { type: String },

    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
); // this line will add two fields to the schema - "createdAt" and "updatedAt" - which will be automatically updated when the document is created or updated.

//if the model "Message" already exists in the mongoose models, use that, otherwise create a new one using the userSchema
export const messageModel =
  mongoose.models.messageSchema || model("Message", messageSchema);
