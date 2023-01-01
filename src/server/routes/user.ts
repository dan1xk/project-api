import { Router } from "express";
import UserController from "../controllers/userController";

export default class UserRoutes {
  init() {
    const route = Router();
    const controller = new UserController();
    route.post("/register", controller.createUser);
    route.post("/login", controller.authUser);
    return route;
  }
}
