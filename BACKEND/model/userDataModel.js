import { userCreation , getPublishedCreations, getLikes, updateLikes} from "../dao/userData.js";

export const userCreationModel = async(userId)=>{
    return await userCreation(userId);
}

export const publishedCreationsModel = async()=>{
    return await getPublishedCreations();
}

export const getLikesModel = async(contentId)=>{
    return await getLikes(contentId);
}

export const updateLikesModel = async(id, likesArr)=>{
    return await updateLikes(id, likesArr);
}