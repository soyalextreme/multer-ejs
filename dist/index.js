"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();
const app_1 = __importDefault(require("./app"));
require("./database");
app_1.default.listen(app_1.default.get("port"), () => {
    console.log(`Application running on port ${app_1.default.get("port")}`);
    console.log(`Enviorment: ${process.env.NODE_ENV}`);
});
