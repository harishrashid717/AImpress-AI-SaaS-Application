import { publishedCreationsModel } from "../model/userDataModel.js";
const publishedCreations = async(req, res, next)=>{
    try{
        const responseData = await publishedCreationsModel();
        return res.status(200).json({
            success : true,
            message: "Published data successfull fetched",
            content: responseData,
        })
    }catch(error){
        next(error);
    }
}
export default publishedCreations;