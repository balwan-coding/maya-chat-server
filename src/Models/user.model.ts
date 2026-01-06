import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  name: { type: String, require: true },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "outher"],
    require: true,
  },

  isOnline: {
    type: Boolean,
    default: false,
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", blogSchema);

export default User;
