import {Task,Itask,status} from '../models/tasks';
import { User,IUser,role } from '../models/users';
import express,{Request,Response} from 'express'
import { IGetUserAuthInfoRequest } from "../types/types";
import * as nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import * as userController from "../controllers/User"
import { error } from 'console';
import { logger } from '../logger';
import mongoose from 'mongoose';
import fs from "fs";
import mongoose_delete from "mongoose-delete";

const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey : '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'
    })
);

const createTask = async (req:IGetUserAuthInfoRequest,res:Response)=>{
        const task = new Task<Itask>({
        description: req.body.description,
        dueDate: req.body.dueDate,
        createdBy:req.user._id
    }) 
        const myTask= await task.save()
        logger.info("New task has been created")
        res.status(200).send(myTask);
}

const assignUser = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    if(req.user?.userRole===role.ADMIN){
    const email=req.body.email;
    const result = await User.findOne({email})
        console.log(result);
        if(result){
            const task = await Task.findById(req.params.id)
            if(task){
                var id = new mongoose.Types.ObjectId(req.params.id);
                 const val=  await Task.findByIdAndUpdate(id,{assignedUser:result._id},{new: true})
                 logger.info("User assigned the task successfully")
                 return res.status(200).send(val)
            } 
        }
        else{
            try{
                transporter.sendMail({
                    to:email,
                    from:"mujhassan786@outlook.com",
                    subject:'Sign up',
                    html:`<!DOCTYPE html>
                    <html>
                       Click on the following link to sign up: http://localhost:3000/form/signup
                    </html>`
                })

                logger.info("Email sent to the user to register")
                console.log("email sent")
            }
            catch{
                logger.error("Email was not send")
                console.log("email not sent")
            }
        }
        req.session.taskToBeAssigned=req.params.id;
        return res.status(200).send({error:"User not found!, email sent to the user to register"})
    }
    res.status(401).send({error: "You are not authorized for this action"});
}

const getallTasks = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    const {page=1,limit=5}=req.query;
    if(req.user?.userRole===role.ADMIN){
        const result = await Task.find({deleted:false}).limit(Number(limit)).skip((Number(page)-1)*Number(limit))
        logger.info("List of all the task(s), fetched")
        return res.status(200).send(result)
    }
    else if(req.user?.userRole===role.MEMBER){
        const result = await Task.find({createdBy:req.user._id},{deleted:false}).limit(Number(limit)).skip((Number(page)-1)*Number(limit))
        logger.info("List of task(s) created by user, fetched")
        return res.status(200).send(result)
    }
    res.status(401).send({error: "You are not authorized for this action"});

}

const getTasksAssigned = async (req:IGetUserAuthInfoRequest,res:Response)=>{
        const {page=1,limit=2} =req.query;
        await req.user.populate({
            path:'task',
            options:{
                limit:Number(limit),
                skip :((Number(page)-1)*Number(limit))
            }
        });
        res.status(200).send(req.user.task);

        // const result = await Task.find()
        // let taskArray=result.filter(function(task){
        //     return task.assignedUser?.toString() ===req.user.id.toString()
        // })
        // logger.info("List of task(s) assigned to the user, fetched")
        // return res.status(200).send(taskArray);
   
}

const editTask = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    try{
        const result = await Task.findById(req.params.id)
        if(result?.createdBy?.toString()===req.user._id.toString())
        {
            const updatedTask= await Task.findByIdAndUpdate(req.params.id,{description:req.body.description,dueDate:req.body.dueDate},{new: true})
            return res.status(200).send(updatedTask)
        }
        res.status(400).send({error: "Task not found"})
    }
    catch
    {
        res.status(401).send({error: "Enter Valid Task Id"});
    }
}

//Will update this route when updating soft delete

const deleteTask = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    try{
        const task = await Task.findById(req.params.id);
        
        if(!task)
        {
            return res.status(404).send({status:"Task Not found"})
        }
        else if(task.deleted){
            console.log(task.deleted)
            return res.status(404).send({status:"Task Not found"})
        }
        task?.delete();
        res.status(200).send({status:"Task Deleted"})
    }
    catch{
        res.status(400).send({error:"Invalid Task Id"})
    }
    
    
}

const updateStatus = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    
    try{
        const taskId = req.params.id;
        const updatedStatus = req.body.taskStatus;
        if(req.user?.userRole===role.ADMIN){
            const task = await Task.findByIdAndUpdate(taskId,{"taskStatus":updatedStatus},{new:true})
            return res.status(200).send(task)
        }
        else if(req.user?.userRole===role.MEMBER)
        {   
            const task = await Task.findById(taskId);
            if((updatedStatus===status.INPROGRESS && task?.taskStatus===status.NEW) || (updatedStatus===status.DONE && task?.taskStatus===status.INPROGRESS)){
                const updatedtask = await Task.findByIdAndUpdate(taskId,{"taskStatus":updatedStatus},{new:true})
                return res.status(200).send(updatedtask)
            }
            return res.status(401).send({error: "You are not authorized for this action"})
        }
    }
    catch{
        return res.status(401).send({error: "Incorrect Task Id"})
    }
    return res.status(401).send({error: "You are not authorized for this action"})
}

const searchTask = async (req:Request,res:Response)=>{
        const {q} = req.query;
        if(q){
            console.log(q)
            const task = await  Task.find({ description:new RegExp(q as string, 'i')});
            return res.status(200).send(task)
        }
        res.status(200).send([])
}
 
const importTasks = async (req:Request,res:Response)=>{

    if(req.session.isLoggedIn && req.session.user?.userRole===role.ADMIN){
        const result = await Task.find()
        logger.info("List of all the task(s), fetched")
        fs.writeFile("./tasks.json", JSON.stringify(result), err => {
            if (err) console.log("Error writing file:", err);
          });
          return res.status(200).send(result)
    }
    const task = new Task();
    
    res.status(401).send({error: "You are not authorized for this action"});
    
}


export {createTask,getallTasks,assignUser,getTasksAssigned,editTask,deleteTask,updateStatus,searchTask,importTasks}