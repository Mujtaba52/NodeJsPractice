import express,{Request,Response}  from "express";
import * as taskController from "../controllers/Tasks"
import * as validator from "../validators/taskValidation"
import {auth} from "../middleware/authorization"
const router = express.Router();


router.post('/task/create',validator.createTaskValidator,auth,taskController.createTask);

router.post('/task/assign/:id',auth,taskController.assignUser);

router.get('/alltasks',auth,taskController.getallTasks);

router.get('/tasks/assigned',auth,taskController.getTasksAssigned);

router.patch('/task/:id',validator.editTaskValidator,auth,taskController.editTask);

router.delete('/task/:id',auth,taskController.deleteTask);

router.patch('/task/updateStatus/:id',validator.UpdateTaskStatusValidator,auth,taskController.updateStatus);

router.get('/task/search',auth,taskController.searchTask);

router.get('/task/importTasks',auth,taskController.importTasks);


export {router};