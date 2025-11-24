import { Router } from "express";
import { CreateRoomController } from "../controllers/CreateRoomController";
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated";
import { GetRoomsController } from "../controllers/GetRoomsController";

const roomsRouter = Router()

const createRoomController = new CreateRoomController()
const getRoomsController = new GetRoomsController()

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nome da sala criada
 *                 description:
 *                   type: string
 *                   description: Descrição da sala
 *       '400':
 *         description: Dados inválidos
 *       '401':
 *         description: Não autorizado - token ausente ou inválido
 */
roomsRouter.post("/", ensureAuthenticated, createRoomController.handle)

/**
 * @swagger
 * /rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Lista todas as salas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token. Formato: "Bearer <JWT>"'
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       '401':
 *         description: Não autorizado - token ausente ou inválido
 */
roomsRouter.get("/", ensureAuthenticated, getRoomsController.handle)

export {roomsRouter}