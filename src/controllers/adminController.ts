import { Request , Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth"

// import model here
import { courseModel } from "../Models/courseModel";

export const createNewCourse = async(req:AuthenticatedRequest , res:Response) : Promise<void> => {
    console.log("inside admin create course")
    try{

         const adminId = req.user?.userId;
         const {courseUrl , courseHeading , courseSubHeading , coursePrice , courseOriginalPrice , courseDiscount} = req.body;

         const createCourse = await courseModel.create({courseHeading , courseSubHeading , coursePrice , courseOriginalPrice , courseDiscount , adminId:adminId});

         if(!createCourse){
            res.status(501).send({
                status : "fail",
                message : "error in creating new course"
            })
            return;
         }

         // course created successfully
         res.status(200).send({
             status : "success",
             message : " New course created ",
             course : createCourse
         })


    }catch(err:unknown){
        let errorMessage;

        if(err instanceof Error){
            errorMessage = err.message;
        } else if( typeof err === 'string'){
            errorMessage = err
        }

        res.status(501).send({
            status : "fail",
            message : "Something wrong in create-course",
            error : errorMessage
        })
    }
}


export const getAdminCourses = async(req:AuthenticatedRequest , res:Response) : Promise<void> => {
    try{
        const adminId = req.user?.userId;
        
        // find all courses for this admin
        const findCourses = await courseModel.find({adminId: adminId});

        if(!findCourses){
            res.status(501).send({
                status : "fail",
                message : "error in finding admin courses"
            })
            return;
         }

         res.status(200).send({
            status : "success",
            courses : findCourses
         })

    }catch(err:unknown){
        let errorMessage;

        if(err instanceof Error){
            errorMessage = err.message;
        } else if( typeof err === 'string'){
            errorMessage = err
        }

        res.status(501).send({
            status : "fail",
            message : "Something wrong in signin",
            error : errorMessage
        })
    }
}


export const updateCourse = async(req:AuthenticatedRequest , res:Response) : Promise<void> => {
    try{

    }catch(err:unknown){
        let errorMessage;

        if(err instanceof Error){
            errorMessage = err.message;
        } else if( typeof err === 'string'){
            errorMessage = err
        }

        res.status(501).send({
            status : "fail",
            message : "Something wrong in signin",
            error : errorMessage
        })
    }
}

export const deleteCourse = async(req:AuthenticatedRequest , res:Response) : Promise<void> => {
    try{

    }catch(err:unknown){
        let errorMessage;

        if(err instanceof Error){
            errorMessage = err.message;
        } else if( typeof err === 'string'){
            errorMessage = err
        }

        res.status(501).send({
            status : "fail",
            message : "Something wrong in signin",
            error : errorMessage
        })
    }
}