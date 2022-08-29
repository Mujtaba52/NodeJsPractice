import * as jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import {IGetUserAuthInfoRequest} from "../types/types"
import { User } from "../models/users";
import { any, string } from "joi";
import { isStringObject } from "util/types";
import { error } from "console";


const auth = async function (req:IGetUserAuthInfoRequest,res:Response,next:NextFunction){

    try{
        const token = req.header('Authorization')?.replace('Bearer ','')
        
        if(token){
            const decoded  = jwt.verify(token,'mysecrettoken');
            if(!isStringObject(decoded))
            {
                const user = await User.findOne({_id:decoded._id,'tokens.token':token});
                if(!user)
                {
                   throw new Error("You are not authorized for this action")
                }
                req.user= user;
                req.token =token;
                next();
            }
        }
        else{
            throw new Error();
        }
       
    }
    catch(e){
        res.status(401).send({error: "You are not authorized for this action"})
    }

}

export {auth};