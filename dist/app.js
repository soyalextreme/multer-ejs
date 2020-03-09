"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
// route import
const index_routes_1 = __importDefault(require("./routes/index.routes"));
// INIT
const app = express_1.default();
// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path_1.default.join(__dirname, "views"));
app.engine(".hbs", express_handlebars_1.default({
    defaultLayout: "main",
    layoutsDir: path_1.default.join(app.get("views"), "layouts"),
    partialsDir: path_1.default.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");
// Middlewares
app.use(morgan_1.default("tiny"));
app.use(express_1.default.json());
app.use(express_1.urlencoded({ extended: false }));
// setting multer
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "./public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() + path_1.default.extname(file.originalname));
    }
});
//using multer
app.use(multer_1.default({ storage }).single("images"));
//Routes
app.use(index_routes_1.default);
exports.default = app;
