import { Server } from "socket.io";
import Message from "../Models/message.model";

const isOnlineUser = new Map<string, string>();

const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      isOnlineUser.set(socket.id, userId);
      console.log("soket id", socket.id, "userId", userId);
      socket.broadcast.emit("user connect", { userId });
    }
    socket.on("message", async (msg) => {
      try {
        const saved = await Message.create(msg);
        console.log("------------- msg saved", saved._id);
        socket.broadcast.emit("message", saved);
      } catch (error) {
        console.error("Message save error:", error);
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
