import { Server } from "socket.io";
import * as MessageServiece from "../Services/message.service";

const isOnlineUser = new Map<string, string>();

const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      isOnlineUser.set(socket.id, userId);
      console.log("soket id", socket.id, "userId", userId);
      socket.broadcast.emit("user connect", { userId });
    }

    socket.on("join_room", async (chatId: string) => {
      socket.join(chatId);
      try {
        const chats = await MessageServiece.getChatHistory(chatId);
        socket.emit("join_room", chats);
      } catch (error) {}
    });

    socket.on("send_message", async (data) => {
      try {
        console.log("Receiving message:", data);

        const savedMessage = await MessageServiece.saveToMessage({
          chatId: data.chatId,
          senderId: data.senderId,
          messageType: data.messageType,
          text: data.text,
          media: data.media,
        });
        console.log("the new message", savedMessage);
        io.to(data.chatId).emit("receive_message", savedMessage);
      } catch (error) {
        console.error("Error processing message:", error);
        socket.emit("error", { message: "Message could not be sent" });
      }
    });

    socket.on("disconnect", () => {
      const disconnectedUserId = isOnlineUser.get(socket.id);

      if (disconnectedUserId) {
        console.log(`User disconnected: ${disconnectedUserId}`);

        // 3. Sabko batao ki ye User OFFLINE ho gaya hai
        socket.broadcast.emit("user_disconnected", {
          userId: disconnectedUserId,
        });

        // Map se remove karo
        isOnlineUser.delete(socket.id);
      }
    });
  });
};

export default initSocket;
