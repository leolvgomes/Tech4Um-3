import { PrismaClient, Room} from "@prisma/client";
import { ICreateRoomDTO } from "../dtos/ICreateRoomDTO";
import { IRoomsRepository } from "../infra/prisma/repositories/IRoomsRepository";

class RoomsRepository implements IRoomsRepository {
    private repository: PrismaClient

    constructor(){
        this.repository = new PrismaClient()
    }

    async create({name, description}: ICreateRoomDTO): Promise<Room> {
        const room = await this.repository.room.create({
            data: {
                name,
                description
            }
        });
        return room;
    }
}

export {RoomsRepository}