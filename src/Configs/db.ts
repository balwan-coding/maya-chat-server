import mongoose from "mongoose";
import { DB_URL } from "./env";
const dbConnect = async () => {
  try {
    if (!DB_URL) {
      throw new Error("db is url is not found");
    }
    await mongoose.connect(DB_URL);
    console.log("db connect");
  } catch (error) {
    console.log("data base faild", error);
  }
};

export default dbConnect;
