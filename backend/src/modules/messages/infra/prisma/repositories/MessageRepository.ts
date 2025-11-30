import { PrismaClient, Message, Prisma } from "@prisma/client";

interface ICreateMessageDTO {
    content: string,
    room_id: string,
    sender_id: string,
    receiver_id?: string
}

export class Messagesrepository {
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient
    }

    async create({content, room_id, sender_id, receiver_id}: ICreateMessageDTO): Promise<Message>{
        const message = await this.prisma.message.create({
            data: {
                content,
                room_id,
                sender_id,
                receiver_id
            }
        })
        return message
    }

    async listByRoom(room_id: string){
        const messages = await this.prisma.message.findMany({
            where: {
                room_id
            },
            include: {
                sender: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                created_at: "asc"
            }
        })
        return messages
    }
}