"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.getTasks = exports.assignUser = exports.createTask = void 0;
const tasks_1 = require("../models/tasks");
const users_1 = require("../models/users");
const nodemailer = __importStar(require("nodemailer"));
const nodemailer_sendgrid_1 = __importDefault(require("nodemailer-sendgrid"));
// const transporter = nodemailer.createTransport(sendgridtransport.default ({
//     auth:{
//         api_key : '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'
//     }
// }))
const transporter = nodemailer.createTransport((0, nodemailer_sendgrid_1.default)({
    apiKey: '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'
}));
const createTask = (req, res) => {
    const task = new tasks_1.Task({
        description: req.body.description,
        dueDate: req.body.dueDate,
        createdBy: req.user._id
    });
    task.save().then((myTask) => {
        console.log(myTask);
        res.status(200).send(myTask);
    });
};
exports.createTask = createTask;
const assignUser = (req, res) => {
    const email = req.body.email;
    users_1.User.findOne({ email }).then(result => {
        console.log(result);
        if (result) {
            tasks_1.Task.findById(req.params.id).then(task => {
                var _a, _b;
                if (task) {
                    ((_a = task.assignedUsers) === null || _a === void 0 ? void 0 : _a.indexOf(result._id)) === -1 ? (_b = task.assignedUsers) === null || _b === void 0 ? void 0 : _b.push(result._id) : console.log("This item already exists");
                    return task.save();
                }
            });
            return res.status(200).send(result);
        }
        else {
            console.log(email);
            transporter.sendMail({
                to: email,
                from: "mujhassan786@outlook.com",
                subject: 'Sign up',
                html: '<h>Sign up please     </h>'
            }).then(() => {
                console.log("email sent");
            }).catch(() => {
                console.log("email not sent");
            });
        }
        res.status(200).send("User not found");
    }).catch((e) => {
        res.status(400).send(e);
    });
};
exports.assignUser = assignUser;
const getTasks = (req, res) => {
    tasks_1.Task.find({ createdBy: req.user._id }).then(result => {
        res.status(200).send(result);
    });
};
exports.getTasks = getTasks;
const editTask = (req, res) => {
    tasks_1.Task.findById(req.params.id).then(result => {
        var _a;
        if (((_a = result === null || result === void 0 ? void 0 : result.createdBy) === null || _a === void 0 ? void 0 : _a.toString()) === req.user._id.toString()) {
            return tasks_1.Task.findByIdAndUpdate(req.params.id, { description: req.body.description, dueDate: req.body.dueDate });
        }
    }).then(result => {
        res.status(200).send("Task Updated");
    }).catch(() => {
        res.status(400).send("Task Not found");
    });
};
exports.editTask = editTask;
const deleteTask = (req, res) => {
    tasks_1.Task.findById(req.params.id).then(result => {
        var _a;
        if (((_a = result === null || result === void 0 ? void 0 : result.createdBy) === null || _a === void 0 ? void 0 : _a.toString()) === req.user._id.toString()) {
            return tasks_1.Task.findByIdAndDelete(req.params.id);
        }
    }).then(() => {
        res.status(200).send("Task Deleted");
    }).catch(() => {
        res.status(400).send("Task Not found");
    });
};
exports.deleteTask = deleteTask;
