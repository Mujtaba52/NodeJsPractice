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
const express_1 = __importDefault(require("express"));
const userRoute = __importStar(require("./routes/User"));
const Task = __importStar(require("./routes/Task"));
const auth = __importStar(require("./routes/auth"));
const users_1 = require("./models/users");
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const mongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
let bodyParser = require('body-parser');
const MONGODB_URI = 'mongodb+srv://Mujhassan786:connect4@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority';
const app = (0, express_1.default)();
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.use(bodyParser.json());
app.use((0, express_session_1.default)({
    secret: 'my secret',
    resave: true,
    saveUninitialized: true,
    store: store
}));
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    users_1.User.findById(req.session.user._id)
        .then(user => {
        req.user = user;
        next();
    })
        .catch(err => console.log(err));
});
app.use(userRoute.router);
app.use(Task.router);
app.use(auth.router);
mongoose_1.default.connect(MONGODB_URI);
app.listen(3000, () => {
});
