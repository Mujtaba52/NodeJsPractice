import express,{Request,Response} from "express";
import { any } from "webidl-conversions";
import {User,IUser} from "../models/users";
import * as bcrypt from "bcrypt"
import { Task,Itask } from "../models/tasks";
import { logger } from "../logger";
import * as lib from "../lib/User"

const creatNewUser = (req:Request,res:Response)=>{
    lib.creatNewUser(req,res);
}
const formSignup = (req:Request, res:Response) => {
    lib.formSignup(req,res);
  };

const formSignupPost = (req:Request, res:Response) => {
        lib.formSignupPost(req,res);
  };

const getallUser = (req:Request, res:Response) => {
    lib.getallUser(req,res);
};

export {
    creatNewUser,
    formSignup,
    formSignupPost,
    getallUser
}