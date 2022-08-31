import express from "express";

import {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.get("/user/:id", getUser);
router.post("/users", registerUser);
router.put("/user/update/:id", updateUser);
router.delete("/user/delete/:id", deleteUser);

export default router;
