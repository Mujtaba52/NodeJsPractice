import * as express from "express"
import * as Task from "./Task";
import * as auth from "./auth";
import * as userRoute from "./User";


const gatherRouters = (app:express.Application)=>{

    app.use(auth.router);
    app.use(userRoute.router);
    app.use(Task.router);
}

export{
    gatherRouters
} 