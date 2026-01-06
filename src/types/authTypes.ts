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
