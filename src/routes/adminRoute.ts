import express from 'express';
const adminRouter = express.Router();

// here is all user route
import { adminOnly, userAuth } from '../middleware/auth';
import { createNewCourse , getAdminCourses , updateCourse , deleteCourse } from '../controllers/adminController';

// adminRouter.use(userAuth);
// adminRouter.use(adminOnly);

// all admin route here;
adminRouter.get('/dashboard' , userAuth , adminOnly , getAdminCourses);
adminRouter.post('/create-course' , userAuth , adminOnly , createNewCourse);
adminRouter.put('/update-course' , updateCourse);
adminRouter.delete('/delete-course' , deleteCourse);

export default adminRouter;