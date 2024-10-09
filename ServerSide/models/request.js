import mongoose, { Schema, Types, model } from "mongoose";

const requestSchema = new Schema({
  
  status:{
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"]
  },
  sender:{
    type: Types.ObjectId,
    ref:"User",
    required: true
  },
  receiver:{
    type: Types.ObjectId,
    ref:"User",
    required: true
  },

}, { timestamps: true }); // this line will add two fields to the schema - "createdAt" and "updatedAt" - which will be automatically updated when the document is created or updated.


//if the model "Request" already exists in the mongoose models, use that, otherwise create a new one using the userSchema
export const requestModel = mongoose.models.requestSchema || model("Request", requestSchema);
