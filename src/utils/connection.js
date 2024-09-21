import mongoose from "mongoose";
const { connect, connection } = mongoose;
import { APP_CONFIG } from "../config/config.js";

function connectDatabase() {
  return connect(APP_CONFIG.DB_URL);
}

connection.on("connected", () => {
  console.log("Database connected succesfully...");
});

connection.on("error", () => {
  console.log(" Database connection failed ...");
});

export default connectDatabase;
