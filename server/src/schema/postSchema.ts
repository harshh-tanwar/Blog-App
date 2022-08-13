import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    picture: {
      type: String,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

export default Post;
