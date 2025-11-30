import { Messagesrepository } from "../infra/prisma/repositories/MessageRepository";

interface IRequest {
    content: string,
    room_id: string,
    sender_id: string,
    receiver_id?: string
}

class CreateMessageService{
    private messagesRepository: Messagesrepository

    constructor(){
        this.messagesRepository = new Messagesrepository
    }

    async execute({content, room_id, sender_id, receiver_id}: IRequest){
        const message = await this.messagesRepository.create({
            content,
            room_id,
            sender_id,
            receiver_id
        })
        return message
    }
}

export {CreateMessageService}