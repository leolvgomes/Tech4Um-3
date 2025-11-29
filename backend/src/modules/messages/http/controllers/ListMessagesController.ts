import { Request, Response } from "express";
import { ListaMessagesService } from "@modules/messages/services/ListMessagesService";

class ListMessagesController{
    async handle(req: Request, res: Response){
        const {room_id} = req.params

        const listMessagesService = new ListaMessagesService()

        const messages = await listMessagesService.execute(room_id)

        return res.json(messages)
    }
}

export {ListMessagesController}