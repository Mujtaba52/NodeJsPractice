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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const userController = __importStar(require("../controllers/User"));
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/user/signup', userController.creatNewUser);
router.get('/form/signup', userController.formSignup);
router.post('/form/signup', function (req, res) {
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log("name " + req);
    res.status(200).send("name " + req.body);
});
// Exercise: 
// Build a simple Application which stores ToDo tasks with a due date for each user. The App should expose following endpoints for CRUD and auth operations. You can use either MySQL or MongoDb (recommended) as the database. 
// Register a new user
// User login
// Add a Task
// Edit a Task
// Delete a Task
// Get All Tasks for a user
// Assign an Internal / External user a task by email address. If the user doesn’t exist send them an email to sign up. Once they signup that note should be assigned to them automatically.
// Add Request Logging for APIs
// API Request Validations
// Share the postman collection to test the endpoints 
