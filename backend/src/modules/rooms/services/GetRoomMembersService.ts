import { RoomsRepository } from "../repositories/IRoomsRepositories"

class GetRoomMembersService{
    private roomsRepository: RoomsRepository
    constructor (){
        this.roomsRepository = new RoomsRepository
    }
    async execute(room_id: string){
        const members = await this.roomsRepository.getMembers(room_id)
        return members
    }
}

export{GetRoomMembersService}