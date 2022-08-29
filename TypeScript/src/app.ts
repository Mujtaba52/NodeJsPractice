import express,{Response} from "express";
import { IGetUserAuthInfoRequest } from "./types/types"
import * as routes from "./routes"
import {User,IUser} from "./models/users";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const mongoDBStore = connectMongoDBSession(session);
let bodyParser = require('body-parser');
import {logger} from "./logger/index";

const MONGODB_URI = 'mongodb+srv://Mujhassan786:connect4@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority'
const app = express();

declare module "express-session" {
   interface SessionData {
      isLoggedIn: Boolean;
      user: IUser;
      taskToBeAssigned?: String;
   }
 }
const store = new mongoDBStore({
   uri:MONGODB_URI,
   collection:'sessions'
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
   secret:'my secret',
   resave:true,
   saveUninitialized:true,
   store:store
}))

app.use((req:IGetUserAuthInfoRequest, res:Response, next) => {
   if (!req.session.user) {
     return next();
   }
   User.findById(req.session.user._id)
     .then(user => {
       req.user = user;
       next();
     })
     .catch(err => console.log(err));
 });

routes.gatherRouters(app)

mongoose.connect(MONGODB_URI)

app.listen(3000,():void=>{
   logger.info("Server has started at port 3000")
});