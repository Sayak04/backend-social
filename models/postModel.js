import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likedBy: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]
});

export default mongoose.model("Post", postSchema);