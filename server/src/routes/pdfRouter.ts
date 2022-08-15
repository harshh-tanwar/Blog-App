import express, { Router, Request, Response, NextFunction } from "express";

//controllers
import { generatePdf } from "../controllers/pdfController";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("🟢 Pdf Api Working");
});

router.post("/getPdf", generatePdf);

export default router;
