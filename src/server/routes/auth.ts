import { Router } from "express";
import authController from "../controllers/authController";
import { authMiddleware } from "./../middlewares/auth";

export default class AuthRoutes {
  init() {
    const route = Router();
    const controller = new authController();
    route.get("/auth", authMiddleware, controller.token);
    return route;
  }
}
