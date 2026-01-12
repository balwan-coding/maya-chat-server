import Message from "../Models/message.model";
import { createMessageData } from "../types/authTypes";

export const saveToMessage = async (data: createMessageData) => {
  try {
    const newMessage = new Message({
      chatId: data.chatId,
      text: data.text,
      messageType: data.messageType,
      media: data.media || {},
      readBy: [data.senderId],
    });
    const savedMessage = await newMessage.save();

    const message = await savedMessage.populate([
      { path: "senderId", select: "name , email avatar" },
      { path: "chatId", select: "chatName isGroupChat" },
    ]);
  } catch (error) {}
};

export const getChatHistory = async (chatId: string) => {
  return await Message.find({ chatId, isDeleted: false })
    .sort({ createdAt: 1 })
    .populate("senderId", "name email avatar");
};
