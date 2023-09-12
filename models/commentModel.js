import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post", 
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export default mongoose.model("Comment", commentSchema);