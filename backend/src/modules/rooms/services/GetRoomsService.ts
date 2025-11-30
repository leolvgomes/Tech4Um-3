import { RoomsRepository } from "../repositories/IRoomsRepositories"

class GetRoomsService {
    private roomsRepository: RoomsRepository
    constructor() {
        this.roomsRepository = new RoomsRepository()
    }
    async execute() {
        const rooms = await this.roomsRepository.find()
        return rooms
    }
}
export { GetRoomsService }