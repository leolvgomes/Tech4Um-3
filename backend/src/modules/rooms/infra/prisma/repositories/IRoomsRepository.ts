import { Room, RoomUser } from "@prisma/client";
import { ICreateRoomDTO } from "@modules/rooms/dtos/ICreateRoomDTO";

export interface IRoomsRepository {
    create(data: ICreateRoomDTO): Promise<Room>;
    find(): Promise<Room[]>;
    join(room_id: string, user_id: string): Promise<RoomUser>;
    getMembers(room_id: string): Promise<RoomUser[]>;
    findUserInRoom(room_id: string, user_id: string): Promise<RoomUser | null>
}