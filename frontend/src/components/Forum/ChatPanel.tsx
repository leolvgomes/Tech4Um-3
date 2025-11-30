import { useEffect, useState, useContext } from "react";
import { socket } from "../../socket";
import { AuthContext } from "../../api/AuthContext";
import "./ChatPanel.css";

type Message = {
  id?: string;
  content: string;
  room_id: string;
  sender_id: string;
  receiver_id: string | null;
  created_at: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
};

interface Participant {
  id: string;
  user_id: string;
  room_id: string;
  joined_at: string;
  user: {
    id: string;
    name: string;
  };
}

interface Room {
  id: string;
  name: string;
  description: string;
  creator: {
    name: string;
    email: string;
  };
}

interface ChatPanelProps {
  roomId: string;
  participants: Participant[];
  selectedUser: string | null;
}

export function ChatPanel({ roomId, participants, selectedUser }: ChatPanelProps) {
  const [mensagens, setMensagens] = useState<Message[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const meuUserId = user?.id;

  // Nome do destinatário
  const receiverName =
    participants.find((p) => p.user_id === selectedUser)?.user.name || "todos";

  // -----------------------------
  // CARREGAR SALA
  // -----------------------------
  useEffect(() => {
    if (!token) return;

    async function carregarSala() {
      try {
        const resp = await fetch(`http://localhost:3333/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const salas = await resp.json();
        const salaAtual = salas.find((r: any) => r.id === roomId);
        setRoom(salaAtual ?? null);

      } catch (err) {
        console.error("Erro ao buscar dados da sala:", err);
      }
    }

    carregarSala();
  }, [token, roomId]);

  // -----------------------------
  // CARREGAR HISTÓRICO DE MENSAGENS
  // -----------------------------
  useEffect(() => {
    if (!token) return;

    async function carregarMensagens() {
      try {
        const resp = await fetch(`http://localhost:3333/messages/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await resp.json();
        if (Array.isArray(data)) setMensagens(data);

      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      }
    }

    carregarMensagens();
  }, [token, roomId]);

  // -----------------------------
  // RECEBER MENSAGENS EM TEMPO REAL
  // -----------------------------
  useEffect(() => {
  socket.emit("join_room", roomId);

  function handleNovaMensagem(msg: Message) {
    setMensagens((prev) => [...prev, msg]);
  }

  socket.on("message_received", handleNovaMensagem);

  return () => {
    socket.off("message_received", handleNovaMensagem);
  };
}, [roomId]);


  // -----------------------------
  // ENVIAR MENSAGEM
  // -----------------------------
  function handleSend() {
    if (!mensagem.trim()) return;

    socket.emit("message", {
      room_id: roomId,
      content: mensagem,
      receiver_id: selectedUser || null,
    });

    setMensagem("");
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <main className="chat-panel">
      <div className="chat-header">
        <h2>{room?.name ?? "Chat da Sala"}</h2>
      </div>

      <div className="chat-messages">
        {mensagens
          .filter(
            (m) =>
              m.receiver_id === null || // mensagem aberta
              m.receiver_id === meuUserId || // privada pra mim
              m.sender_id === meuUserId // enviada por mim
          )
          .map((m) => (
            <div key={m.id} className="chat-item">
              <div className="chat-content">
                <span className="chat-author">{m.sender?.name ?? "Você"}</span>
                <p className="chat-text">{m.content}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="chat-typing">&nbsp;</div>

      <div className="chat-input-box">
        <div className="chat-input-header">
          Enviando para: <b>{receiverName}</b>
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Escreva aqui uma mensagem..."
            className="chat-input"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="chat-send-button" onClick={handleSend}>
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}
