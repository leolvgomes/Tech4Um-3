import { Router } from "express";
import { CreateMessageController } from "../controllers/CreateMessageController";
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated";
import { ListMessagesController } from "../controllers/ListMessagesController";

const messagesRoutes = Router()
const createMessageController = new CreateMessageController()
const listMessagesController = new ListMessagesController()

/**
 * @swagger
 * /messages/:room_id:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Enviar mensagem (Pública ou Privada)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token. Formato: "Bearer <JWT>"'
 *         schema:
 *           type: string
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Texto da mensagem
 *               receiver_id:
 *                 type: string
 *                 description: (Opcional) ID do usuário destino. Se não enviado, é pública.
 *     responses:
 *       '201':
 *         description: Mensagem enviada
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Token inválido ou ausente
 */
messagesRoutes.post("/:room_id", ensureAuthenticated, createMessageController.handle);

/**
 * @swagger
 * /messages/{room_id}:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Lista mensagens de uma sala
 *     description: Retorna todas as mensagens da sala especificada, ordenadas por `created_at` (ascendente).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: 'Bearer token. Formato: "Bearer <JWT>"'
 *         schema:
 *           type: string
 *       - in: path
 *         name: room_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da sala cujas mensagens serão listadas
 *     responses:
 *       '200':
 *         description: Lista de mensagens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   content:
 *                     type: string
 *                   room_id:
 *                     type: string
 *                     format: uuid
 *                   sender_id:
 *                     type: string
 *                     format: uuid
 *                   receiver_id:
 *                     type: string
 *                     nullable: true
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   sender:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       '401':
 *         description: Não autorizado — token ausente ou inválido
 *       '404':
 *         description: Sala não encontrada
 *       '500':
 *         description: Erro interno do servidor
 */
messagesRoutes.get("/:room_id", ensureAuthenticated, listMessagesController.handle)

export{messagesRoutes}