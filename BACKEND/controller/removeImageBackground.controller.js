import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";
import { removeImageBackgroundModel } from "../model/userContentModel.js";
import fs from "fs/promises";

const removeImageBackground = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

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
      const error = new Error("This feature is only available to premium users");
      error.statusCode = 403;
      throw error;
    }

    // Upload with background removal
   const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
  transformation: [{ effect: "background_removal" }],
});



    const secureUrl = uploadResponse.secure_url; 

    // Save metadata
    await removeImageBackgroundModel(
      userId,
      "Remove background from the image",
      secureUrl,
      "image",
      false
    );

    // remove temp file
    await fs.unlink(req.file.path);

    res.status(201).json({
      message: "Background removed successfully",
      url: secureUrl,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default removeImageBackground;
