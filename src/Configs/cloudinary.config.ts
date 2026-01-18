import { v2 as cloudinary } from "cloudinary";
import * as env from "./env";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import { MulterFile } from "../types/multerTypes";
import multer from "multer";

// cloudinary config
cloudinary.config({
  cloud_name: env.CLOUDINARY_SERVER_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// storage congig

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: MulterFile) => {
    const fileName = file.originalname.split(".")[0];

    // default valus

    let folderName = "others";
    let resourceType = "auto";

    // folder resource

    if (file.mimetype.startsWith("image")) {
      folderName = "maya-talk/image";
    } else if (file.mimetype.startsWith("image")) {
      folderName = "maya-talk/videos";
      resourceType = "video";
    } else if (file.mimetype === "application/pdf") {
      folderName = "maya-talk/docs";
    }

    return {
      folderName: folderName,
      resourceType: resourceType,
      public_id: fileName,
      formate: file.mimetype == "application/pdf" ? "pdf" : undefined,
    };
  },
});

const uploade = multer({ storage: storage });

export default uploade;
