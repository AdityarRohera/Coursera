import { NextFunction, Request , Response } from "express";
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

 export interface AuthenticatedRequest extends Request {
    user?: {
        userId : string,
        isAdmin : boolean
    };  // or number, depending on your token
  }

export const userAuth = async(req:AuthenticatedRequest , res:Response ,next:NextFunction) : Promise<void> => {
    try{
        const {token} = req.headers;
        console.log("inside userAuth -> " , token);

        if(!token){
            res.status(409).send({
                status: "fail",
                message: "signin in"
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
        req.user = tokenVerification;
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

export const adminOnly = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const isAdmin = req.user?.isAdmin;
    console.log("inside adminOnly ->", isAdmin);

    if (!isAdmin) {
        res.status(403).send({
            status: "fail",
            message: "This is a protected route for admins only"
        });
        return;
    }

    console.log("Admin confirmed, proceeding...");
    next();
};