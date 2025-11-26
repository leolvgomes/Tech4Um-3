import { JoinRoomService } from "@modules/rooms/services/JoinRoomService";
import { Request, Response } from "express";

class JoinRoomController{
    async handle(req: Request, res: Response){
        const joinRoomService = new JoinRoomService

        const {room_id} = req.params;

        const {id: user_id} = req.user;

        const joinRoom = await joinRoomService.execute(
            room_id, user_id
        )

        return res.status(200).json(joinRoom)
    }
}

export {JoinRoomController}