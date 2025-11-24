import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { LoginUserController } from "../controllers/LoginUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.post("/login", loginUserController.handle);

export { usersRoutes };