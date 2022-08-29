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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formSignupPost = exports.formSignup = exports.creatNewUser = void 0;
const users_1 = require("../models/users");
const bcrypt = __importStar(require("bcrypt"));
const creatNewUser = (req, res) => {
    users_1.User.findOne({ email: req.body.email }).then(userFound => {
        console.log(userFound);
        if (userFound) {
            return res.status(409).send("User already exists");
        }
        bcrypt.hash(req.body.password, 12).then((hashedpassword) => {
            const user = new users_1.User({
                name: req.body.name,
                email: req.body.email,
                password: hashedpassword
            });
            user.save().then((myUser) => {
                console.log(myUser);
                res.status(200).send(myUser);
            });
        });
    });
};
exports.creatNewUser = creatNewUser;
const formSignup = (req, res) => {
    res.sendFile(process.cwd() + '/utils/signup.html');
};
exports.formSignup = formSignup;
const formSignupPost = (req, res) => {
    var name = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    console.log("name " + name + " " + email);
    res.status(200).send("name " + name + " " + email);
};
exports.formSignupPost = formSignupPost;
