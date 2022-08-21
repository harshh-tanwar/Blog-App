import express, { Router, Request, Response, NextFunction } from "express";
import auth from "../middleware/auth";

//controllers
import {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("🟢 Posts Api Working");
});

router.post("/create", auth, createPost);

router.get("/posts", auth, getPosts);

router.get("/post/:id", auth, getPost);

router.delete("/delete/:id", auth, deletePost);

router.put("/update/:id", auth, updatePost);

export default router;
