import { Request, Response } from "express";
import Post from "../schema/postSchema";
import pool from "../database/dbConnectPg";

export const createPost = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const post = await new Post(data);
    await post.save();
    res.status(200).json({ message: "Post Created", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).json({ message: "Got the Post", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    let posts;
    if (userId !== undefined) {
      const oldUser = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        userId,
      ]);
      const user = oldUser.rows[0];
      const email = user?.email;
      posts = await Post.find({ userEmail: { $in: email } }).sort({
        createdAt: -1,
      });
      const count = await Post.count({ userEmail: { $in: email } });
      res
        .status(200)
        .json({ message: "Got User Posts", count: count, data: posts });
    } else {
      posts = await Post.find().sort({ createdAt: -1 }).sort({
        createdAt: -1,
      });
      res.status(200).json({ message: "Got All Posts", data: posts });
    }
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
    res.status(200).json({ message: "Post Updated", data: post });
  } catch (error) {
    res.status(500).json(error);
  }
};
