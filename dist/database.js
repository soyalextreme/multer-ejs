"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let runLocal = "mongodb://localhost:/changeDataBaseName";
const settingsDB = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default
    .connect(process.env.DB_STRING || runLocal, settingsDB)
    .then(success => console.log("Database Connected"))
    .catch(err => console.error(err));
