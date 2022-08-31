import { Request, Response } from "express";
import pool from "../database/dbConnectPg";
import jwt from "jsonwebtoken";
import config from "../config/config";

//get a user
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Got the User", data: user.rows[0] });
  } catch (error) {
    res.send(error);
  }
};

//register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, userimage } = req.body;
  try {
    let user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const oldUser = user.rows[0];
    /* console.log("fetched", oldUser); */

    /* login */
    if (oldUser !== undefined) {
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser.user_id },
        config.jwtPrivateKey
      );
      return res
        .header("x-auth-token", token)
        .send({ user: oldUser, token: token });
    }

    /* register */
    user = await pool.query(
      "INSERT INTO users (name, email, userimage) VALUES ($1, $2, $3) RETURNING *",
      [name, email, userimage]
    );
    const newUser = user.rows[0];
    /* console.log("created", newUser); */
    const token = jwt.sign(
      { email: newUser.email, id: newUser.user_id },
      config.jwtPrivateKey
    );
    res.header("x-auth-token", "token").send({ user: newUser, token: token });
  } catch (error) {
    res.send(error);
  }
};

//update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, userimage } = req.body;

    const updatedUser = await pool.query(
      "UPDATE users SET name=$1, email=$2, userimage=$3 WHERE user_id = $4 RETURNING *",
      [name, email, userimage, id]
    );

    res
      .status(200)
      .json({ message: "Updated1 the User", data: updatedUser.rows[0] });
  } catch (error) {
    res.send(error);
  }
};

//delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );

    res.status(200).json({ message: "Deleted the User" });
  } catch (error) {
    res.send(error);
  }
};
