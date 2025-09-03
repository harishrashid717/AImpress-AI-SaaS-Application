import { getAuth } from "@clerk/express";
import generateContent from "../services/generateContent.js";
import { contentAddModel } from "../model/userContentModel.js";

const generateBlogTitleController = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const { prompt } = req.body;

    // Optional input check
    if (!prompt) {
      const error = new Error("Prompt is required");
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

    const content = await generateContent(prompt, 100);
    

    await contentAddModel(userId, prompt, content, "blog-title");

    res.status(201).json({
      success : true,
      message: "Content generated and successfully added",
      titles: content,
    });
  } catch (error) {
    return next(error);
  }
};

export default generateBlogTitleController;
