import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "video", "audio", "file"],
      required: true,
    },

    text: {
      type: String,
      default: null,
    },

    media: {
      url: String,
      fileName: String,
      fileSize: Number,
      mimeType: String, // image/png, video/mp4
      duration: Number, // audio/video (seconds)
      width: Number, // image/video
      height: Number,
    },

    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
