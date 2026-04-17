import express from "express";

const app = express(); //Create an express app

// Parse json req from users
app.use(express.json());

// routes import
import userRouter from "./routes/user.route.js";

// Route declaration
app.use("/api/v1/users", userRouter);

// Example route: http://localhost:4000/api/v1/users/register

export default app;
