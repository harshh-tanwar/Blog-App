import { Request, Response } from "express";
import getPdf from "../utils/puppeteer";

export const generatePdf = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const pdf = await getPdf(data.url);
    const base64pdf = pdf.toString("base64");
    res.status(200).send(base64pdf);
  } catch (error) {
    res.status(500).json(error);
  }
};
