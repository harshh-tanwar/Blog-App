import express, { Router, Request, Response, NextFunction } from "express";

//controllers
import {
uploadFile
} from "../controllers/upload";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("🟢 Upload Api Working");
});

router.post("/upload", uploadFile);


export default router;
