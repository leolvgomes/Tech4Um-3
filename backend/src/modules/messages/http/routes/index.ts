import { Router } from "express"
import { messagesRoutes } from "./messages.routes"

const messagesRouter = Router()

messagesRouter.use("/messages", messagesRoutes)

export {messagesRouter}