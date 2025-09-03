import express from 'express';
import auth from '../middleware/auth.js';
import getUserCreattion from '../controller/userCreations.controller.js';
import publishedCreations from '../controller/publishCreations.controller.js';
import toggleLikeCreations from '../controller/toggleLikeCreations.controller.js';
// import testController from '../controller/test.controller.js';
const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, getUserCreattion);
userRouter.get('/get-published-creations', auth, publishedCreations);
userRouter.post('/toggle-like-creation/:id', auth, toggleLikeCreations);
// userRouter.get('/test', testController);
export default userRouter;