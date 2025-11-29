import { useEffect, useState } from "react";
import { socket } from "../../socket";
import "./ChatPanel.css";

interface Message {
  id: string;
  content: string;
  room_id: string;
  sender_id: string;
  receiver_id: string | null;
  created_at: string;
  sender: {
    name: string;
    email: string;
  };
}

export function ChatPanel({ roomId = "570e2732-42d8-4311-ad6b-afe114a4fe6a" }) {
  const [mensagens, setMensagens] = useState<Message[]>([]);
  const [mensagem, setMensagem] = useState("");

  const token = localStorage.getItem("token");

  // =====================================================
  // 1. Carrega mensagens históricas da sala ao abrir
  // =====================================================
  async function carregarMensagens() {
  try {
    const resp = await fetch(`http://localhost:3333/messages/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await resp.json();

    console.log("RETORNO DA API (bruto) =>", data);
    if (Array.isArray(data)) {
        setMensagens(data);
      }

  } catch (err) {
    console.error("Erro ao buscar mensagens:", err);
  }
}



  // =====================================================
  // 2. Conectar ao socket e ouvir mensagens novas
  // =====================================================
  useEffect(() => {
    carregarMensagens(); // Carrega mensagens do banco

    socket.emit("join_room", roomId);

    socket.on("message_received", (msg: Message) => {
      setMensagens((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message_received");
    };
  }, [roomId]);

  // =====================================================
  // 3. Enviar mensagem para o backend
  // =====================================================
  function enviarMensagem() {
    if (!mensagem.trim()) return;

    socket.emit("message", {
      room_id: roomId,
      content: mensagem,
      receiver_id: null,
    });

    setMensagem("");
  }

  // =====================================================
  // Render
  // =====================================================
  return (
    <main className="chat-panel">
      <div className="chat-header">
        <h2>Product Development Stuff</h2>
        <span className="chat-created-by">
          Criado por: <b>Eduardo Santos</b>
        </span>
      </div>

      <div className="chat-messages">
        {mensagens.map((m) => (
          <div key={m.id} className="chat-item">
            <div className="chat-content">
              <span className="chat-author">{m.sender?.name ?? "Usuário"}</span>
              <p className="chat-text">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-box">
        <div className="chat-input-header">Enviando para todos do 4um</div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Escreva aqui uma mensagem..."
            className="chat-input"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
          />
          <button className="chat-send-button" onClick={enviarMensagem}>
            ➤
          </button>
        </div>
      </div>
    </main>
  );
}
