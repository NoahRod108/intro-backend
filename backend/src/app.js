import express from "express";

const app = express(); //Create an express app

// Parse json req from users
app.use(express.json());
// Middleware to show frontend
app.use(express.static("./frontend"));

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// Route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Example route: http://localhost:4000/api/v1/users/register

export default app;
