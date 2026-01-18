import Chat from "../Models/chat.model";
import User from "../Models/user.model";

export const accessChatService = async (
  currentUserId: string,
  targetUserId: string,
) => {
  let isChat = await Chat.find({
    type: "private",
    $and: [
      { members: { $elemMatch: { $eq: currentUserId } } },
      { members: { $elemMatch: { $eq: targetUserId } } },
    ],
  })
    .populate("members", "-password")
    .populate({
      path: "lastMessage",
      populate: {
        path: "senderId",
        select: "name profilePic email",
      },
    })
    .lean();

  if (isChat.length > 0) {
    return isChat[0];
  }
  
  try {
    const chatData = {
      groupName: "sender",
      type: "private",
      members: [currentUserId, targetUserId],
    };

    const createChat = await Chat.create(chatData);
    const fullChat = await Chat.find({ _id: createChat._id })
      .populate("members", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "name profilePic email",
        },
      })
      .lean();

    return fullChat;
  } catch (error) {
    throw error;
  }
};

export const fetchChatService = async (userId: string) => {
  try {
    const chats = await Chat.find({
      members: { $elemMatch: { $eq: userId } },
    })
      .populate("members", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "senderId",
          select: "name profilePic email",
        },
      })
      .sort({ updatedAt: -1 })
      .lean();

    return chats;
  } catch (error) {
    throw error;
  }
};
