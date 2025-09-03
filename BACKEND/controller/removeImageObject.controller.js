import { getAuth } from "@clerk/express";
import connectCloudinary from "../config/cloudinary.js";
import { removeImageObjectModel } from "../model/userContentModel.js";
import fs from "fs/promises";

const removeImageObject = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const { prompt } = req.body;

    if (!userId) {
      const error = new Error("User not authenticated");
      error.statusCode = 401;
      throw error;
    }

    if (!req.file) {
      const error = new Error("No file uploaded");
      error.statusCode = 400;
      throw error;
    }

    const plan = req.plan;
    if (plan !== "premium") {
      const error = new Error(
        "This feature is only available to premium users"
      );
      error.statusCode = 403;
      throw error;
    }
    
    const cloudRes = await connectCloudinary.uploader.upload(req.file.path, {
      transformation: [
        {
          effect: `gen_remove:prompt_${prompt}`,
        },
      ],
    });

    const { secure_url } = cloudRes;
    // Remove local temp file
    await fs.unlink(req.file.path);

    // Store in DB
    await removeImageObjectModel(userId, prompt, secure_url, "image", false);

    res.status(201).json({
      message: "Object removed successfully",
      url: secure_url,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default removeImageObject;
