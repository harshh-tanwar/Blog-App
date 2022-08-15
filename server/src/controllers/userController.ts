import { Request, Response } from "express";
import User from "../schema/userSchema";
import jwt from "jsonwebtoken";
import config from "../config/config";

//get a user
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting User");
  }
};

//register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, google, userImage } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        config.jwtPrivateKey,
        {
          expiresIn: "1h",
        }
      );
      return res
        .header("x-auth-token", token)
        .send({ user: user, token: token });
    }

    user = new User({
      name: name,
      email: email,
      userImage: userImage,
    });
    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      config.jwtPrivateKey,
      {
        expiresIn: "1h",
      }
    );
    res.header("x-auth-token", token).send({ user: user, token: token });
  } catch (error) {
    res.send(error);
  }
};

//user Login
/* export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        errorMessage: "User doesn't exist, kindly login with another account",
      });

    if (user.google === true) {
      return res
        .status(400)
        .json({ errorMessage: "User must do Google Login" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ errorMessage: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({ user: user, token: token });
  } catch (error) {
    res.send(`Error: ${error}`);
  }
}; */
