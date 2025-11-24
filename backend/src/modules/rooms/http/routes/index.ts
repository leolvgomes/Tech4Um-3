import { Router } from "express"
import { roomsRouter } from "./rooms.routes"

const roomRouter = Router()

roomRouter.use("/rooms", roomsRouter)

export {roomRouter}