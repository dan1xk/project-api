import { Router, Request, Response } from "express";
import UserController from "../controllers/authController";

export default class UserRoutes {
  init() {
    const routes = Router();
    routes.get("/user", new UserController().store);

    return routes;
  }
}
