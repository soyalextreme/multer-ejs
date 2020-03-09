import mongoose, { ConnectionOptions as setInterface } from "mongoose";

let runLocal = "mongodb://localhost:/changeDataBaseName";

const settingsDB: setInterface = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect(process.env.DB_STRING || runLocal, settingsDB)
  .then(success => console.log("Database Connected"))
  .catch(err => console.error(err));
