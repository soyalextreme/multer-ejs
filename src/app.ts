import express, { urlencoded } from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import handlebars from "express-handlebars";

// route import
import indexRoutes from "./routes/index.routes";

// INIT

const app = express();

// settings

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

app.engine(
  ".hbs",
  handlebars({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(urlencoded({ extended: false }));
// setting multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime().toString() + path.extname(file.originalname));
  }
});
//using multer
app.use(multer({ storage }).single("images"));

//Routes
app.use(indexRoutes);

export default app;
