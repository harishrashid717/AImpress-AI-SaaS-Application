import { contentAdd, imageAdd , removeImageBackground, removeImageObject, resumeReview} from "../dao/userContent.js";

export const contentAddModel = async(user_id, prompt, content , type)=>{
    return await contentAdd(user_id, prompt, content , type);
}

export const imageAddModel = async (user_id, prompt, content, type,  publish) => {
  return await imageAdd(user_id, prompt, content, type,  publish);
};

export const removeImageBackgroundModel = async(user_id, prompt, content, type,  publish)=>{
  return await removeImageBackground(user_id, prompt, content, type,  publish);
}

export const removeImageObjectModel = async(user_id, prompt, content, type,  publish)=>{
  return await removeImageObject(user_id, prompt, content, type,  publish);
}

export const resumeReviewModel = async(user_id, prompt, content, type,  publish)=>{
  return await resumeReview(user_id, prompt, content, type,  publish);
}