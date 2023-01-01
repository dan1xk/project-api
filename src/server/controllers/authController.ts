import { Request, Response } from "express";
import User from "../models/user";
import "dotenv/config";

export default class authController {
  async token(req: Request, res: Response) {
    return res.send({ ok: true, user: req.userId });
  }
}
