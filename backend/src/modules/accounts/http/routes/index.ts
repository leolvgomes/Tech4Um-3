import { Router } from "express";
import { usersRoutes } from "@modules/accounts/http/routes/users.routes";

const router = Router();

// Toda rota que começar com /users vai para o usersRoutes
router.use("/users", usersRoutes);

export { router };