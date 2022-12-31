import { Router, Request, Response } from "express";
import UserController from "../controllers/authController";

export default class UserRoutes {
  init() {
    const routes = Router();
    const controller = new UserController();
    routes.post("/register", controller.store);
    return routes;
  }
}
