import { Room } from "@prisma/client";
import { ICreateRoomDTO } from "@modules/rooms/dtos/ICreateRoomDTO";

export interface IRoomsRepository {
    create(data: ICreateRoomDTO): Promise<Room>;
    find(): Promise<Room[]>;
}