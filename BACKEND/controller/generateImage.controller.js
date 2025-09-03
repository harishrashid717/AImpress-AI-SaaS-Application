import { generateImageFromText } from "../services/generateImageFromText.js";
// import { generateImageFromText } from "../services/generateImageFromText.js";
import { v2 as cloudinary } from "cloudinary";
import { imageAddModel } from "../model/userContentModel.js";
import { getAuth } from "@clerk/express"; // guessing this is what you’re using
// import generateContent from "../services/generateContent.js";

const generateImageController = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      const error = new Error("Unauthorized: User ID not found");
      error.statusCode = 401;
      throw error;
    }

    const { prompt, publish } = req.body;

    if (!prompt) {
      const error = new Error("Prompt is required");
      error.statusCode = 400;
      throw error;
    }

    const plan = req.plan;
    if (plan !== "premium") {
      const error = new Error(
        "This feature is only available for premium subscriptions"
      );
      error.statusCode = 401;
      throw error;
    }

    const base64Image = await generateImageFromText(prompt);

    const { secure_url } = await cloudinary.uploader.upload(base64Image);


    await imageAddModel(userId, prompt, secure_url, "image", publish ?? false);

    res.status(201).json({
      message: "Content generated and successfully added",
      content: secure_url,
    });
  } catch (error) {
    return next(error);
  }
};

export default generateImageController;
