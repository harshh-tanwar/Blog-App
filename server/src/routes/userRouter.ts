import express from "express";

import { getUser, registerUser } from "../controllers/userController";

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/users", registerUser);

export default router;
