import { Request, Response } from "express";
import { CreateMessageService } from "@modules/messages/services/CreateMessageService";

class CreateMessageController{
    async handle(req: Request, res: Response){
        const {room_id} = req.params
        const {id: sender_id} = req.user
        const {content, receiver_id} = req.body

        const createMessageService = new CreateMessageService()

        const message = createMessageService.execute({
            room_id,
            sender_id,
            content,
            receiver_id
        })
        return res.status(201).json(message)
    }
}

export {CreateMessageController}