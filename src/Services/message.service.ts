import Message from "../Models/message.model";
import { createMessageData } from "../types/authTypes";

export const saveToMessage = async (data: createMessageData) => {
  try {
    console.log("--------------------------- the message data", data);
    const newMessage = new Message({
      chatId: data.chatId,
      text: data.text,
      messageType: data.messageType,
      media: data.media || {},
      readBy: [data.senderId],
      senderId: data.senderId,
    });

    console.log("--------------------- the message data before", newMessage);
    const savedMessage = await newMessage.save();
    console.log(
      "--------------------------- the message data after",
      savedMessage
    );
    const message = await savedMessage.populate([
      { path: "senderId", select: "name , email avatar" },
      { path: "chatId", select: "chatName isGroupChat" },
    ]);

    return message;
  } catch (error) {}
};

export const getChatHistory = async (chatId: string) => {
  const chats = await Message.find({ chatId, isDeleted: false })
    .sort({ createdAt: 1 })
    .populate("senderId", "name email avatar");
  return chats;
};
