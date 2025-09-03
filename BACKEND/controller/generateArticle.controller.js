import { getAuth } from "@clerk/express";
import generateContent from "../services/generateContent.js";
import { contentAddModel } from "../model/userContentModel.js";

const generateArticleController = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const { prompt, length, type } = req.body;

    // Optional input check
    if (!prompt || !length || !type) {
      const error = new Error("Prompt, length, and type are required");
      error.statusCode = 400;
      throw error;
    }

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      const error = new Error("Limit reached, Upgrade to continue");
      error.statusCode = 403;
      throw error;
    }

    const content = await generateContent(prompt, length);
   

    await contentAddModel(userId, prompt, content, type);

    res.status(201).json({
      success : true,
      message: "Content generated and successfully added",
      article: content,
    });
  } catch (error) {
    return next(error);
  }
};

export default generateArticleController;
