import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function createSocket(token?: string) {
  if (socket) return socket;

  socket = io("http://localhost:3333", {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket connected", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect_error:", err);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
