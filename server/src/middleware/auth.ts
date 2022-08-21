import express, { Application, Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  /* console.log(`Token - ${token}`); */
  if (!token) return res.status(400).send("No token Provided");
  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    /* req.user = decoded; */
    /*  console.log(decoded, req.user); */
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default auth;
