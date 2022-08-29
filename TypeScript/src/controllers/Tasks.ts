import {Task,Itask} from '../models/tasks';
import { User,IUser } from '../models/users';
import express,{Request,Response} from 'express'
import { IGetUserAuthInfoRequest } from "../types/types";
import * as nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import * as userController from "../controllers/User"
import { error } from 'console';
import { logger } from '../logger';
import * as lib from "../lib/Tasks"

const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey : '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'
    })
);

const createTask = (req:IGetUserAuthInfoRequest,res:Response)=>{  
    lib.createTask(req,res);
}

const assignUser = (req:Request,res:Response)=>{
    lib.assignUser(req,res);
}

const getallTasks = (req:IGetUserAuthInfoRequest,res:Response)=>{
   lib.getallTasks(req,res);
}

const getTasksAssigned = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.getTasksAssigned(req,res);
}

const editTask = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.editTask(req,res);
}


const deleteTask = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.deleteTask(req,res);
}

const updateStatus = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.updateStatus(req,res);
}

const searchTask = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.searchTask(req,res);
}

const importTasks = (req:IGetUserAuthInfoRequest,res:Response)=>{
    lib.importTasks(req,res);
}



export {createTask,getallTasks,assignUser,getTasksAssigned,editTask,deleteTask,updateStatus,searchTask,importTasks}