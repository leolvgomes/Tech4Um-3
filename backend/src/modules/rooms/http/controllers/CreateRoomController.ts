import { CreateRoomService } from "@modules/rooms/services/CreateRoomService";
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";

class CreateRoomController {
    async handle(req: Request, res: Response): Promise<Response | null> {
        const { name, description } = req.body

        const createRoomService = new CreateRoomService()
        const user_id = (req as any).user?.id

        try {
            const room = await createRoomService.execute({
                name, description, creator_id: user_id
            })
            return res.status(201).json(room)
        } catch (err) {
            throw new AppError("Dados invalidos!", 400)
        }
    }
}

export { CreateRoomController }