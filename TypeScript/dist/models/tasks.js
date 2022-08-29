"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    assignedUsers: [{
            type: mongoose_1.default.Types.ObjectId,
            ref: 'user',
            unique: true
        }]
});
const Task = mongoose_1.default.model('task', taskSchema);
exports.Task = Task;
