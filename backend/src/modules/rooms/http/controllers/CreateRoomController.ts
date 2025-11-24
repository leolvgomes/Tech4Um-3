import { CreateRoomService } from "@modules/rooms/services/CreateRoomService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";

class CreateRoomController {
    async handle(req: Request, res: Response): Promise<Response | null> {
        const { name, description } = req.body

        const createRoomService = new CreateRoomService()

        try {
            const room = await createRoomService.execute({
                name, description
            })
            return res.status(201).json(room)
        } catch (err) {
            throw new AppError("Dados invalidos!", 401)
        }
    }
}

export { CreateRoomController }