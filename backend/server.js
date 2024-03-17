import express from "express";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import groupRoutes from "./routes/groupChat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import path from "path";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Enable CORS
app.use(
  cors({
    exposedHeaders: ["Retry-After"],
  })
);

//limit requests from same ip
const limiter = rateLimit({
  max: 100, //allow 100 requests per ip in one hour
  windowMs: 60 * 60 * 1000,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests from this IP" });
  },
});

app.use("/api", limiter);

//body parser reading data from the body in req.body
app.use(
  express.json({
    limit: "300kb",
  })
);
//remove $ sign from request body query string req params
app.use(mongoSanitize());

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/group", groupRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

function appStarted() {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
}

server.listen(PORT, appStarted);
