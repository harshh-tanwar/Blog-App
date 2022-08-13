import express, { Router, Request, Response, NextFunction } from "express";

//controllers
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("🟢 Posts Api Working");
});

router.post("/create", createPost);

router.get("/posts", getPosts);

router.delete("/delete/:id", deletePost);

router.put("/update/:id", updatePost);

export default router;
