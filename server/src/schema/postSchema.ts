import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    pictureId: {
      type: String,
    },
    userName: {
      type: String,
    },
    userimage: {
      type: String,
    },
    userEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

export default Post;
