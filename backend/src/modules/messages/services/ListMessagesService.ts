import { Messagesrepository } from "../infra/prisma/repositories/MessageRepository";

class ListaMessagesService {
    private messagesRepository: Messagesrepository
    constructor() {
        this.messagesRepository = new Messagesrepository
    }

    async execute(room_id: string){
        const messages = await this.messagesRepository.listByRoom(room_id)
        return messages
    }
}

export {ListaMessagesService}