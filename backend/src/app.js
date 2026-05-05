import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); //Create an express app

// Parse json req from users
app.use(express.json());
// Middleware to show frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// Route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Example route: http://localhost:4000/api/v1/users/register

export default app;
