import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",        // your Vite frontend
  credentials: true,
};

app.use(cors(corsOptions));              // ✅ this is enough for most cases

app.use(cookieParser());
app.use(express.json());

// Global logger
app.use((req, res, next) => {
  console.log("📥 Incoming:", req.method, req.url);
  next();
});

import userRouter from "./src/routes/user.router.js";
app.use("/api/users", userRouter);

export { app };
