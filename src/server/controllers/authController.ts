import { Request, Response } from "express";
import User from "../models/user";

export default class UserController {
  async store(req: Request, res: Response) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "User already exists" });
      }
      const user = await User.create(req.body);
      user.password = undefined;
      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  }
}
