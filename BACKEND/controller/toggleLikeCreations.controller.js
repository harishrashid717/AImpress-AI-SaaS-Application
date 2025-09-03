import { getLikesModel, updateLikesModel } from "../model/userDataModel.js";
import { getAuth } from "@clerk/express";

const toggleLikeCreations = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    const id = req.params.id;

    if (!id) {
      const error = new Error("Creation ID is required");
      error.statusCode = 400;
      throw error;
    }

    let likesArr = await getLikesModel(id);
  
    likesArr = JSON.parse(likesArr);

    let message = "";

    if (likesArr.includes(userId)) {
      likesArr = likesArr.filter((likeId) => likeId !== userId);
      message = "Creation Unliked";
    } else {
      likesArr.push(userId);
      message = "Creation Liked";
    }

    likesArr.length !== 0
      ? (likesArr = JSON.stringify(likesArr))
      : (likesArr = null);

    const updateResult = await updateLikesModel(id, likesArr);

    if (!updateResult) {
      const error = new Error("Failed to update likes");
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      success: true,
      message,
      likes: likesArr ? JSON.parse(likesArr) : [],
    });
  } catch (error) {
    next(error);
  }
};

export default toggleLikeCreations;
