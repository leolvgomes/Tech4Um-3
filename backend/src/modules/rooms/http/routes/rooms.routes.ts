import { Router } from "express";
import { CreateRoomController } from "../controllers/CreateRoomController";
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated";
import { GetRoomsController } from "../controllers/GetRoomsController";
import { JoinRoomController } from "../controllers/JoinRoomController";
import { GetRoomMembersController } from "../controllers/GetRoomMembersController";

const roomsRouter = Router()

const createRoomController = new CreateRoomController()
const getRoomsController = new GetRoomsController()
const joinRoomController = new JoinRoomController() 
const getRoomMembersController = new GetRoomMembersController()

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

/**
 * @swagger
 * /rooms/{room_id}/entrar:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Entrar em uma sala
 *     description: Cria o vínculo entre o usuário logado e a sala especificada.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da sala que o usuário deseja entrar
 *     responses:
 *       '200':
 *         description: Usuário entrou na sala com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 room_id:
 *                   type: string
 *                   format: uuid
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                 joined_at:
 *                   type: string
 *                   format: date-time
 *       '400':
 *         description: Sala não encontrada ou usuário já está nela
 *       '401':
 *         description: Token inválido ou ausente
 */
roomsRouter.post("/:room_id/entrar", ensureAuthenticated, joinRoomController.handle)

/**
 * @swagger
 * /rooms/{room_id}:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Listar membros de uma sala
 *     description: Retorna a lista de todos os usuários que estão vinculados a esta sala.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da sala para buscar os membros
 *     responses:
 *       '200':
 *         description: Lista de membros recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do vínculo
 *                   user_id:
 *                     type: string
 *                   room_id:
 *                     type: string
 *                   joined_at:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       '401':
 *         description: Token inválido ou ausente
 */
roomsRouter.get("/:room_id", ensureAuthenticated, getRoomMembersController.handle)

export {roomsRouter}