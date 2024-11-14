import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Post from "../models/Post.js";

const router = express.Router();

// GET /user/posts - Gibt alle Posts des angemeldeten Benutzers zurück
router.get("/user/posts", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const posts = await Post.find({ authorId: userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving user posts" });
    }
});

// POST /user/posts - Erstellt einen neuen Post für den angemeldeten Benutzer
router.post("/user/posts", authMiddleware, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const userId = req.user._id;
        const newPost = await Post.create({
            title: title,
            description: description,
            authorId: userId
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);  // Logge den Fehler aus
        res.status(500).json({ error: "Error creating post", details: error.message });
    }
});

// GET /posts - Gibt alle Posts unabhängig vom Benutzer zurück
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving posts" });
    }
});

export default router;
