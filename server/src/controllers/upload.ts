import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    res.status(200).json({ message: "Uploaded", data: data });
  } catch (error) {
    res.status(500).json(error);
  }
};
