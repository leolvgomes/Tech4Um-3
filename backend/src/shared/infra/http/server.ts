import { app } from './app';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { setupWebSocket } from "../websockets/client"

const PORT = process.env.PORT || 3333;

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

setupWebSocket(io)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});