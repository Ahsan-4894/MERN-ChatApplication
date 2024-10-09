import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: {
      publicid: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
); // this line will add two fields to the schema - "createdAt" and "updatedAt" - which will be automatically updated when the document is created or updated.

//if the model "User" already exists in the mongoose models, use that, otherwise create a new one using the userSchema
export const userModel = mongoose.models.User || model("User", userSchema);
