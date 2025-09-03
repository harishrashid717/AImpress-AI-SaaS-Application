// import { setDemoLikes, getDemoLikes } from "../dao/userData.js";
// const testController = async (req, res) => {
//   try {
//     let likes = [
//       "user_30jGaYgai4eHSWspybzdHuqtLuh",
//       "user_91kXnTuvb7mQJDrslePaHvfwZt",
//       "user_74mHdFqiZ8kNRGxoyTjUvLcwpE",
//       "user_52oGpJlzvXnCaDyMbqUrHwktfS",
//       "user_63tVzFjowYxKrLmPqDnUbHsgAe",
//     ];
    
//     likes = JSON.stringify(likes);
//     await setDemoLikes(9, likes)
    
//     let dbLikes = await getDemoLikes(9);
//     dbLikes = JSON.parse(dbLikes)
//     return res.json({dbLikes})
  
//   } catch (error) {
//     return res.json({ error });
//   }
// };
// export default testController;
