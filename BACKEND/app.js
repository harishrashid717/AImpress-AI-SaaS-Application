import express from "express";
import cors from 'cors';
import "dotenv/config";
import db from './config/dbConnection.js'
import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import aiRouter from "./routes/aiRouter.js";
import cloudinary from "./config/cloudinary.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

//  connectCloudinary();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(clerkMiddleware());

// DB test

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1+1 AS result");
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Home route
app.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT 1 + 1 AS result");
  res.send("Home page");
});

// AI routes
app.use("/api/ai", aiRouter);
app.use('/api/user', userRouter);

// Clerk details route
app.get("/api/getClerkDetails", async (req, res) => {
  let { userId, has } = getAuth(req);
  const hasPremium = await has({ plan: "premium" });


  // Temporary hardcoded user ID for testing
  userId = "user_30jGaYgai4eHSWspybzdHuqtLuh";

  if (!userId) {
    return res.json({ errorMessage: "Failed to find the user" });
  }

  const user = await clerkClient.users.getUser(userId);
  res.status(200).json({ user });
});
app.use(errorHandler);
// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
