if (process.env.NODE_ENV !== "production") require("dotenv").config();

import app from "./app";
import "./database";

app.listen(app.get("port"), () => {
  console.log(`Application running on port ${app.get("port")}`);
  console.log(`Enviorment: ${process.env.NODE_ENV}`);
});
