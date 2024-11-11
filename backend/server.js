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

app.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  try {
    const user = await User.findOne({ verificationToken: token });



    if (user && Date.now() < user.tokenExpiresAt) {

      // Проверка, что пользователь не подтвержден
      if (user.verified) {
        return res.status(400).json({ error: "Account is already verified" });
      }

      // Подтверждаем учетную запись
      user.verified = true;
      user.verificationToken = undefined;
      user.tokenExpiresAt = undefined;

      await user.save();

      res.status(200).json({ message: "Account successfully verified" });
    } else {
      return res.status(400).json({ "error": "Invalid or expired token " })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));