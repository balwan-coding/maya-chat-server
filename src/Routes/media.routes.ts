import express from "express";
import uploade from "../Configs/cloudinary.config";

const mediaRoute = express.Router();

mediaRoute.post("/media/uplode", uploade.single("chat_media"));

export default mediaRoute;
