import { ICreateRoomDTO } from "../dtos/ICreateRoomDTO";
import { RoomsRepository } from "../repositories/IRoomsRepositories";

class CreateRoomService{
    private roomsRepository: RoomsRepository
    constructor(){
        this.roomsRepository = new RoomsRepository()
    }

    async execute({name, description, creator_id}: ICreateRoomDTO){
        const room = await this.roomsRepository.create({
            name, description
        })

        // If we have a creator id (request came from an authenticated user),
        // create the RoomUser link so the creator is a member (and will appear as first joined)
        if (creator_id) {
            try {
                await this.roomsRepository.join(room.id, creator_id);
            } catch (err) {
                // don't fail room creation if joining the creator fails; just log
                console.error("Failed to add creator to room:", err);
            }
        }

        return room;
    }
}

export {CreateRoomService}