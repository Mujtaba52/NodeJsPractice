import mongoose from "mongoose";
import validator from "validator"
import { Task } from "./tasks";
import jwt from "jsonwebtoken";
import { string } from "joi";

enum role{
    ADMIN='Admin',
    MEMBER='Member'
}

interface IUser {
    _id?:mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    getPublicProfile?:any;
    generateToken?:any;
    versionKey?:Boolean;
    userRole?:string;
    tokens?:string;
  }

  
const userSchema :mongoose.Schema<IUser> = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        trim:true
    },
    email:{
        type : String,
        required :true,
        trim:true,
        lowercase:true
    },
    password:{
        type : String,
        required :true,
        minlength:7
    },
    userRole:{
        type: String,
        enum:role,
        default:role.MEMBER
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
    ]
},
{
    timestamps: true
})


userSchema.set('versionKey',false);
userSchema.methods.getPublicProfile= function(){

    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.id;
    //delete userObj.tokens;
    return userObj;
}


userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:(this._id).toString()},'mysecrettoken',{expiresIn:'1 hour'})
    this.tokens.unshift({token})
    await this.save();
    return token;
}


userSchema.virtual('task',{
    ref:'task',
    localField: '_id',
    foreignField: 'assignedUser'

})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


const User = mongoose.model<IUser>('user',userSchema);
export {User,IUser,role}
