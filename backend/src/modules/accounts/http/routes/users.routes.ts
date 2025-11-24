import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { LoginUserController } from "../controllers/LoginUserController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cria um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Conta criada com sucesso!
 *       '401':
 *         description: Credenciais inválidas!
 */
usersRoutes.post("/", createUserController.handle);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Autentica um usuário (login)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Autenticação bem-sucedida
 *       '401':
 *         description: Credenciais inválidas
 */
usersRoutes.post("/login", loginUserController.handle);

export { usersRoutes };