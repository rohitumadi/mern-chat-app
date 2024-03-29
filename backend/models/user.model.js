import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 5 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilePic: { type: String, default: "" },
  }, //createdAt,updatedAt
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
