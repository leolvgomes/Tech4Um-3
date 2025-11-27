import { useState } from "react";
import "./ChatPanel.css";

const messages = [
  {
    name: "Eduardo Santos",
    text: "Opa! Bora bater um papo!",
    image: "https://i.pravatar.cc/40?img=12",
  },
  {
    name: "Rafael Moura",
    text: "Fala time!",
    image: "https://i.pravatar.cc/40?img=22",
  },
  {
    name: "Camila Duarte",
    text: "Oi, tudo bem com voces?",
    image: "https://i.pravatar.cc/40?img=32",
  },
];

export function ChatPanel() {
  return (
    <main className="chat-panel">
      <div className="chat-header">
        <h2>Product Development Stuff</h2>
        <span className="chat-created-by">
          Criado por: <b>Eduardo Santos</b>
        </span>
      </div>

      <div className="chat-messages">
        {messages.map((m, idx) => (
          <div className="chat-item" key={idx}>
            <img src={m.image} alt={m.name} className="chat-avatar" />

            <div className="chat-content">
              <span className="chat-author">{m.name}</span>
              <p className="chat-text">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-typing">Amanda Oliveira está digitando…</div>

      <div className="chat-input-box">
        <div className="chat-input-header">Enviando para todos do 4um</div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Escreva aqui uma mensagem maneira para mandar para os colegas..."
            className="chat-input"
          />
          <button className="chat-send-button">➤</button>
        </div>
      </div>
    </main>
  );
}
