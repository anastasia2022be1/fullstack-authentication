import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    authorId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    }
})


const Post = mongoose.model("Post", postSchema);

export default Post;