import { NextFunction, Request , Response } from "express";
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

 export interface AuthenticatedRequest extends Request {
    userId?: string;  // or number, depending on your token
  }

export const userAuth = async(req:AuthenticatedRequest , res:Response ,next:NextFunction) : Promise<void> => {
    try{

        const {token} = req.headers;

        if(!token){
            res.status(409).send({
                status: "fail",
                message: "signin up"
            })
            return;
        }

        // token found now verify token
        const tokenVerification = await jwt.verify(token , secret);

        if(!tokenVerification){
            res.status(409).send({
                status: "fail",
                message: "Token invalid"
            })
            return;
        }

        // token verified
        req.userId = tokenVerification.userId;
        next();

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
}