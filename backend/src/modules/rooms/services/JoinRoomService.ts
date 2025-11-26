import AppError from "@shared/errors/AppError"
import { RoomsRepository } from "../repositories/IRoomsRepositories"

class JoinRoomService {
    private rooms_repository: RoomsRepository
    constructor() {
        this.rooms_repository = new RoomsRepository
    }
    async execute(id_room: string, id_user: string) {
        const userAlreadyIn = await this.rooms_repository.findUserInRoom(id_room, id_user)
        if (userAlreadyIn){
            throw new AppError("Usúario já está no fórum! ", 400)
        }
        const roomUser = await this.rooms_repository.join(id_room, id_user)
        return roomUser
    }
}

export { JoinRoomService }