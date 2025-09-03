import { getAuth } from "@clerk/express";
import { userCreationModel } from "../model/userDataModel.js";

const getUserCreation = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);  
    
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const responseData = await userCreationModel(userId);
    return res.status(200).json({ success: true, responseData: responseData });
  } catch (error) {
    next(error);
  }
};

export default getUserCreation;
