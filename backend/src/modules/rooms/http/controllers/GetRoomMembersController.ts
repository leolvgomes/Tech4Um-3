import { GetRoomMembersService } from "@modules/rooms/services/GetRoomMembersService"
import { Request, Response } from "express"

class GetRoomMembersController {
    async handle(req: Request, res: Response) {
        const getRoomMembersService = new GetRoomMembersService()
        const {room_id}= req.params
        const members = await getRoomMembersService.execute(room_id)
        res.status(200).json(members)
    }
}
export { GetRoomMembersController }