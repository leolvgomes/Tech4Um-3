import { Request, Response } from "express";
import { ListaMessagesService } from "@modules/messages/services/ListMessagesService";

class ListMessagesController{
    async handle(req: Request, res: Response){
        const {room_id} = req.params

        const ListMessagesService = new ListaMessagesService

        const messages = await ListMessagesService.execute(room_id)

        return res.json(messages)
    }
}

export {ListMessagesController}