import { PrismaClient, Room, RoomUser, User } from "@prisma/client";
import { ICreateRoomDTO } from "../dtos/ICreateRoomDTO";
import { IRoomsRepository } from "../infra/prisma/repositories/IRoomsRepository";

class RoomsRepository implements IRoomsRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create({ name, description }: ICreateRoomDTO): Promise<Room> {
        const room = await this.repository.room.create({
            data: {
                name,
                description
            }
        });
        return room;
    }

    async find(): Promise<Room[]> {
        const rooms = await this.repository.room.findMany()
        return rooms
    }

    async join(room_id: string, user_id: string): Promise<RoomUser> {
        const roomUser = await this.repository.roomUser.create({
            data: {
                user_id,
                room_id
            }
        })
        return roomUser
    }

    async findUserInRoom(room_id: string, user_id: string): Promise<RoomUser | null> {
        const roomUser = await this.repository.roomUser.findFirst({
            where: {
                room_id: room_id,
                user_id: user_id,
            },
        });

        return roomUser;
    }

    async getMembers(room_id: string): Promise<RoomUser[]> {
        const members = await this.repository.roomUser.findMany({
            where: {
                room_id: room_id
            },
            include: {
                user: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return members
    }
}

export { RoomsRepository }