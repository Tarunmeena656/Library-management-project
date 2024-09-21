/**
 * Import Modules
 */
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { config } from "dotenv";
config();

/**
 * Import Utilities
 */
import indexRouter from "../routes/index.route.js";
import { mainErrorHandler, notFoundHandler } from "../middlewares/error.middleware.js";
import '../middlewares/auth.middleware.js'

const app = express();

/*Middleware */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter)

app.use(notFoundHandler);
app.use(mainErrorHandler);

export default app;
