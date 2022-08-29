import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";


enum status{
    NEW='New',
    INPROGRESS='In Progress',
    DONE='Done'
}

interface Itask {
    description: string;
    dueDate: Date;
    createdBy?:mongoose.Types.ObjectId;
    assignedUser?:mongoose.Types.ObjectId;
    taskStatus?: string;
    deleted?:boolean;
  }

const taskSchema:mongoose.Schema<Itask> = new mongoose.Schema({


    description:{
        type: String,
        required: true,
        trim:true
    },
    dueDate:{
        type : Date,
        required: true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    assignedUser:{
        type:mongoose.Types.ObjectId,
        default:null,
        ref:'user'
    },
    taskStatus:{
        type: String,
        enum:status,
        default:status.NEW
    }
},
{
    timestamps: true
})
taskSchema.plugin(mongoose_delete);

const Task = mongoose.model<Itask>('task',taskSchema)

export {Task,Itask,status}