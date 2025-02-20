import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import fatSecretRouter from "./src/routes/fatSecretRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API endpoints
app.get("/", (req, res) => res.send("API is Working Now"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/fatsecret", fatSecretRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
