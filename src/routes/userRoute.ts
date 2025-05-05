import express from 'express';
const userRouter = express.Router();

// here is all user route
import {userSignUp , userSignin , getCourses} from '../controllers/userController';
import { userAuth } from '../middleware/auth';

userRouter.post('/signup' , userSignUp);
userRouter.post('/signin' , userSignin);

userRouter.use(userAuth);
userRouter.get('/courses' , getCourses);

export default userRouter;
