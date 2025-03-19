import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import fatSecretRouter from "./src/routes/fatSecretRoutes.js";
import foodRouter from "./src/routes/foodRoutes.js";
import userGoalsRouter from "./src/routes/userGoalsRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

let allowedOrigins: string[] = ["http://localhost:5173"];

if (process.env.NODE_ENV === "production" && process.env.FRONTEND_URL) {
  allowedOrigins = [process.env.FRONTEND_URL];
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// API endpoints
app.get("/", (req, res) => res.send("API is Working Now"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/fatsecret", fatSecretRouter);
app.use("/api/food", foodRouter);
app.use("/api/goals", userGoalsRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
