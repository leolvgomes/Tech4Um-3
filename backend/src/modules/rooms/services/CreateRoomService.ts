import { ICreateRoomDTO } from "../dtos/ICreateRoomDTO";
import { RoomsRepository } from "../repositories/IRoomsRepositories";

class CreateRoomService{
    private roomsRepository: RoomsRepository
    constructor(){
        this.roomsRepository = new RoomsRepository()
    }

    async execute({name, description}: ICreateRoomDTO){
        const room = await this.roomsRepository.create({
            name, description
        })

        return room;
    }
}

export {CreateRoomService}