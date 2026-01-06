import { hasPassword, virifyPassword } from "../lib/password";
import User from "../Models/user.model";
import jwt from "jsonwebtoken";
import {
  loginTypes,
  registerTypes,
  valideUserNameTypes,
} from "../types/authTypes";
import "dotenv/config";

const jwtToke: string = process.env.JWT || "default-secret-key";

export const registerUserService = async (userData: registerTypes) => {
  const { name, username, password, gender, email, phoneNumber } = userData;

  const isUser = await User.findOne({
    $or: [
      { userName: new RegExp(`^${username}$`, "i") },
      { email: new RegExp(`^${email}$`, "i") },
    ],
  });

  if (isUser) {
    throw new Error("user is allready exists");
  }

  const encryptPassword = await hasPassword(password);

  const newUser = await User.create({
    name,
    userName: username,
    password: encryptPassword,
    gender,
    email,
    phoneNumber,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    jwtToke
  );

  return { newUser, token };
};

export const loginUserService = async (userData: loginTypes) => {
  const { userNameOrEmail, password } = userData;

  const isUser = await User.findOne({
    $or: [
      { userName: new RegExp(`^${userNameOrEmail}$`, "i") },
      { email: new RegExp(`^${userNameOrEmail}$`, "i") },
    ],
  });

  if (!isUser) {
    throw new Error("user is not exists please register");
  }

  if (!isUser.password) {
    throw new Error("User password is missing.");
  }

  const isValidePasword = await virifyPassword(password, isUser.password);

  if (!isValidePasword) {
    throw new Error("Password is invalid");
  }

  const token = jwt.sign(
    {
      id: isUser._id,
    },
    jwtToke
  );

  return { token, isUser };
};

export const isValideUserName = async (userName: valideUserNameTypes) => {
  console.log(userName.userName);
  const isUserName = await User.exists({ userName: userName.userName });

  console.log(isUserName);

  if (isUserName) {
    console.log(isUserName, "----------------------------------");
    throw new Error("This username is allready exists");
  }

  return { message: "Your User name is crroctec" };
};
