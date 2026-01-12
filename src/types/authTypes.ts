export interface registerTypes {
  name: string;
  username: string;
  password: string;
  gender: string;
  email: string;
  phoneNumber: number;
}

export interface loginTypes {
  userNameOrEmail: string;
  password: string;
}

export interface valideUserNameTypes {
  userName: string;
}

export interface createMessageData {
  chatId: string;
  senderId: string;
  messageType: "text" | "image" | "video" | "audio" | "file";
  text: string;
  media?: {
    url: string;
    fileName: string;
    fileSize: string;
    mimeType: string;
  };
}
