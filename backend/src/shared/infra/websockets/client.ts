import { Server, Socket } from "socket.io";
import { verify } from "jsonwebtoken"
import { CreateMessageService } from "@modules/messages/services/CreateMessageService";

interface IPayload {
    sub: string
}

export function setupWebSocket(io: Server) {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token

        if (!token) {
            return next(new Error("Authentication error"))
        }

        try {
            const { sub } = verify(token, "segredinho") as IPayload
            socket.data.user_id = sub
            next();
        } catch (Err) {
            next(new Error("Authentication error"))
        }
    })
    io.on("connection", (socket: Socket) => {
        console.log(`Usuário conectado: ${socket.id} (User ID: ${socket.data.user_id})`)
        socket.join(socket.data.user_id)
        socket.on("join_room", (room_id) => {
            socket.join(room_id)
            io.to(room_id).emit("user_status", {
                user_id: socket.data.user_id,
                status: "online"
            })

            console.log(`User ${socket.data.user_id} entrou na sala ${room_id}`);

        })

        socket.on("message", async (data) => {
            const { room_id, content, receiver_id } = data;

            const createMessageService = new CreateMessageService

            try {
                const message = await createMessageService.execute({
                    content,
                    room_id,
                    sender_id: socket.data.user_id,
                    receiver_id
                })

                if (message.receiver_id) {
                    io.to(receiver_id).emit("message_received", message)
                    socket.emit("message_received", message)
                }
                else {
                    io.to(room_id).emit("message_received", message)
                }
            } catch (err) {
                console.error("Erro ao salvar mensagem via socket:", err)
            }
        })

        socket.on("typing_start", (room_id) => {
            socket.broadcast.to(room_id).emit("user_typing", {
                user_id: socket.data.user_id,
                is_typing: true
            })
        })

        socket.on("typing_stop", (room_id) => {
            socket.broadcast.to(room_id).emit("user_typing", {
                user_id: socket.data.user_id,
                is_typing: false
            })
        })

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id)
        })
    })
}