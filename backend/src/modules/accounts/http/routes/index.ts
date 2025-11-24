import { Router } from "express";
import { usersRoutes } from "@modules/accounts/http/routes/users.routes";

const userRouter = Router();

userRouter.use("/users", usersRoutes);

export { userRouter };