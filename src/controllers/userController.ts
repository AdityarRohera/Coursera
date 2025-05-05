import { Request , Response } from "express"
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { AuthenticatedRequest } from "../middleware/auth";

// import models here 
import { userModel } from "../Models/userModel";

export const userSignUp = async (req : Request , res : Response) : Promise<void> => {
    try{    
        const {firstName , lastName , password , email , isAdmin} = req.body;
        console.log(firstName , lastName , password);

        // first check user already exist or not
        const checkUser = await userModel.findOne({email:email});
        if(checkUser){
            res.status(409).send({
                status: "fail",
                message: "User already exists"
            })
            return;
        }

        if(!checkUser){

            // hash password
            let hashPassword : string | undefined;
          try{
             hashPassword = await bcrypt.hash(password, saltRounds);

          }catch(e:unknown){
             res.status(502).send({
                status: "fail",
                message : "error in bcrypt password",
                error: e
            })
            return;
          }

            // create new user
            const newUser = await userModel.create({name : {firstName , lastName} , password: hashPassword , email , isAdmin});
            if(!newUser){
                res.status(502).send({
                    status: "fail",
                    message: "Error in registering user"
                })
                return;
            }
            if(newUser){
                res.status(200).send({
                    status: "success",
                    message: "user registered successfully"
                })
                return;
            }
        }

    }catch(err: unknown){
        let errorMessage;

        if(err instanceof Error){
            errorMessage = err.message;
        } else if( typeof err === 'string'){
            errorMessage = err
        }

        res.status(501).send({
            status : "fail",
            message : "Something wrong in signup",
            error : errorMessage
        })
    }
}

export const userSignin = async(req:Request , res:Response) : Promise<void> => {
    try{
        const{email , password} = req.body;
        
        const checkUser = await userModel.findOne({email});

        if(!checkUser){
            res.status(409).send({
                status : "fail",
                message : "register first"
            })
            return;
        }

        // if user found then check password is correct or not 
        const comparePassword = await bcrypt.compare(password ,checkUser.password);

        if(!comparePassword){
            res.status(409).send({
                status:"fail",
                message: "password incorrect"
            })
            return;
        }

        // password is correct now create token
        try{
            const userId = checkUser._id;
            const token = await jwt.sign({
                userId : userId
            } , secret);

            if(token){
                res.status(200).send({
                    status: "success",
                    message: "user login successfully",
                    token: token
                })
                return;
            }

        }catch(e:unknown){
            let errorMessage;

            if(e instanceof Error){
                errorMessage = e.message;
            } else if( typeof e === 'string'){
                errorMessage = e
            }
    
            res.status(501).send({
                status : "fail",
                message : "error in creating token",
                error : errorMessage
            })
          }

        } catch(err){
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

export const getCourses = async(req:AuthenticatedRequest , res:Response) : Promise<void> => {
    const {userId} = req;
    res.send({
        userId : userId
    })
}