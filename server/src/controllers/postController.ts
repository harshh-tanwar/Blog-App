import { Request, Response } from "express";
import Post from "../schema/postSchema";

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await new Post(data);
    console.log(post);
    await post.save();
    res.status(200).json({ message: "Post Created", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "All Posts", data: posts });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    await post?.delete();
    res.status(200).json({ message: "Post Deleted", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(200).json({ message: "Post Deleted", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};
