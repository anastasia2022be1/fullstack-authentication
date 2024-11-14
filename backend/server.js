import express from "express";
import User from "./models/User.js";
import mongoose from "mongoose";
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

await mongoose.connect(process.env.MONGODB_DB)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api", authRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));