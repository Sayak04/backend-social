import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    followers: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    following: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    posts : [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
