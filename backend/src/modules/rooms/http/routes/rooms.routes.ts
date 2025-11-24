import { Router } from "express";
import { CreateRoomController } from "../controllers/CreateRoomController";
import { ensureAuthenticated } from "@shared/middlewares/ensureAuthenticated";

const roomsRouter = Router()

const createRoomController = new CreateRoomController()

roomsRouter.post("/", ensureAuthenticated, createRoomController.handle)

export {roomsRouter}