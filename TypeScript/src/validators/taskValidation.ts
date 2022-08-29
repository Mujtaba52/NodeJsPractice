import joi from 'joi';
import mongoose from 'mongoose';
import {Request,Response} from 'express';
import {Itask} from "../models/tasks";

const createTask = joi.object<Itask>({
    description: joi.string().required(),
    dueDate: joi.date().required()
})

const editTask = joi.object<Itask>({
    description: joi.string(),
    dueDate: joi.date()
}).or('description', 'dueDate')


const updateTaskStatus = joi.object<Itask>({
    taskStatus: joi.string().valid('New','In Progress','Done').required()
})


const createTaskValidator=(req:Request,res:Response,next:any)=>{
    const {error,value} = createTask.validate(req.body,{abortEarly : false});
    if(error)return res.send(error.details)
    next();
    }

const editTaskValidator=(req:Request,res:Response,next:any)=>{
    const {error,value} = editTask.validate(req.body,{abortEarly : false});
    if(error)return res.send(error.details)
    next();
    }

const UpdateTaskStatusValidator=(req:Request,res:Response,next:any)=>{
    const {error,value} = updateTaskStatus.validate(req.body,{abortEarly : false});
    if(error)return res.send(error.details)
    next();
    }

export {
    createTaskValidator,
    editTaskValidator,
    UpdateTaskStatusValidator
}
