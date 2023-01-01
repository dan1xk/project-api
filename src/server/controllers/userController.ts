import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const generateToken = (params = {}) => {
  return jwt.sign(params, process.env.SECRET as string, {
    expiresIn: 172800,
  });
};

export default class UserController {
  async createUser(req: Request, res: Response) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });
      }

      const user = await User.create(req.body);
      user.password = undefined;
      return res.send({ user, token: generateToken({ id: user.id }) });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  }

  async authUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = (await User.find({ email }).select("+password"))[0];

    if (!user) return res.status(400).send({ error: "email not found" });
    if (!(await bcrypt.compare(password, user.password!)))
      return res.status(400).send({ error: "wrong password" });

    user.password = undefined;
    return res.send({ user, token: generateToken({ id: user.id }) });
  }
}
