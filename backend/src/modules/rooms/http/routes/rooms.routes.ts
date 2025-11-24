import { Router } from "express";
import { CreateRoomController } from "../controllers/CreateRoomController";
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated";

const roomsRouter = Router()

const createRoomController = new CreateRoomController()

/**
 * @swagger
 * tags:
 *   - name: Rooms
 *     description: Gerenciamento de salas
 */

/**
 * @swagger
 * /rooms:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Cria uma sala
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token. Formato: "Bearer <JWT>"'
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sala criada com sucesso
 *       '400':
 *         description: Dados inválidos
 *       '401':
 *         description: Não autorizado - token ausente ou inválido
 */
roomsRouter.post("/", ensureAuthenticated, createRoomController.handle)

export {roomsRouter}