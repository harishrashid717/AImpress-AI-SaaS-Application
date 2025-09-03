import express from "express";
import generateArticleController from "../controller/generateArticle.controller.js";
import generateBlogTitleController from "../controller/generateBlogTitle.controller.js";
import generateImageController from "../controller/generateImage.controller.js";
import auth from "../middleware/auth.js";
import removeImageBackground from "../controller/removeImageBackground.controller.js";
import upload from "../config/multer.js";
import removeImageObject from "../controller/removeImageObject.controller.js";
const aiRouter = express.Router();
import resumeReview from "../controller/resumeReview.controller.js";


aiRouter.post('/generate-article',auth, generateArticleController);
aiRouter.post('/generate-blog-title', auth, generateBlogTitleController);
aiRouter.post('/generate-image',auth, generateImageController);
aiRouter.post('/remove-background', auth, upload.single('image') , removeImageBackground);
aiRouter.post('/remove-image-object', auth, upload.single('image'), removeImageObject);
aiRouter.post('/review-resume', auth, upload.single('resume'), resumeReview);

export default aiRouter;