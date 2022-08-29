"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogOut = exports.UserLogIn = void 0;
const users_1 = require("../models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserLogIn = (req, res) => {
    const password = req.body.password;
    users_1.User.findOne({ email: req.body.email })
        .then((user) => {
        if (!user) {
            return res.status(404).send("User not found");
        }
        bcrypt_1.default.compare(password, user.password)
            .then((passwordMatch) => {
            if (passwordMatch) {
                console.log("trueeee");
                req.session.user = user;
                return res.status(200).send(user);
            }
        }).catch(() => {
            return res.status(401).send("Incorrect Username or Password");
        });
    });
};
exports.UserLogIn = UserLogIn;
const UserLogOut = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.status(200).send("user logged out");
    });
};
exports.UserLogOut = UserLogOut;
/*
const jwt = require("jsonwebtoken");
const User = require("../dal/models/users");

const auth = async (req, res, next) => {
  try {
    console.log("hellooo1");

    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "tryingOutJsonWebToken");
    const user = await User.findOne({ id: decoded._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;

*/ 
