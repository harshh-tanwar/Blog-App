import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  /* console.log(`Token - ${token}`); */
  if (!token) return res.status(400).send("No token Provided");
  try {
    jwt.verify(token, config.jwtPrivateKey);
    /*  console.log(decoded); */
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
