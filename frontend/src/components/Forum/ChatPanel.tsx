import { useState } from "react";
import "./ChatPanel.css";

type Message = {
  id?: string;
  content: string;
  created_at?: string;
  sender?: { name?: string; email?: string; id?: string };
};

interface ChatPanelProps {
  roomName?: string;
  createdBy?: string;
  messages?: Message[];
  onSend?: (content: string) => Promise<void> | void;
}

export function ChatPanel({ roomName = "Sala", createdBy = "", messages = [], onSend }: ChatPanelProps) {
  const [input, setInput] = useState("");

  async function handleSend() {
    const content = input.trim();
    if (!content) return;
    if (onSend) {
      try {
        await onSend(content);
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
      }
    }
    setInput("");
  }

  return (
    <main className="chat-panel">
      <div className="chat-header">
        <h2>{roomName}</h2>
        <span className="chat-created-by">
          {createdBy ? (
            <>
              Criado por: <b>{createdBy}</b>
            </>
          ) : null}
        </span>
      </div>

      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div className="chat-item" key={m.id ?? idx}>
            <div className="chat-content">
              <span className="chat-author">{m.sender?.name ?? "Anon"}</span>
              <p className="chat-text">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-typing">&nbsp;</div>

      <div className="chat-input-box">
        <div className="chat-input-header">Enviando para todos do 4um</div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Escreva aqui uma mensagem maneira para mandar para os colegas..."
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button className="chat-send-button" onClick={handleSend}>➤</button>
        </div>
      </div>
    </main>
  );
}
