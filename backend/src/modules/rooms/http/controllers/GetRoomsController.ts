import { GetRoomsService } from "@modules/rooms/services/GetRoomsService";
import { Request, Response } from "express";

class GetRoomsController{
    async handle(req: Request, res: Response){
        const getRoomsService = new GetRoomsService()
        
        const rooms = await getRoomsService.execute()

        return res.status(200).json(rooms)
    }
}

export {GetRoomsController}