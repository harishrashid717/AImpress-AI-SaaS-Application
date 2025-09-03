import { getAuth } from "@clerk/express";
import reviewResume from "../services/reviewResume.js";
import { resumeReviewModel } from "../model/userContentModel.js";
import fs from "fs"; 
import pdf from "pdf-parse";

const resumeReview = async (req, res, next) => {
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

    if (req.file.size > 5 * 1024 * 1024) {
      const error = new Error("Resume file size exceeds allowed size (5 MB)");
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

    const dataBuffer = fs.readFileSync(req.file.path); 
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const reviewedResponse = await reviewResume(prompt, 1000);
    await resumeReviewModel(
      userId,
      "review the uploaded resume",
      reviewedResponse,
      "resume",
      false
    );

    res.status(201).json({
      message: "Resume review successful",
      content: reviewedResponse,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default resumeReview;
