import { useState } from "react";
import "./ParticipantsPanel.css";

const participants = [
  { name: "Eduardo Santos", image: "https://i.pravatar.cc/40?img=12" },
  { name: "Rafael Moura", image: "https://i.pravatar.cc/40?img=22" },
  { name: "Camila Duarte", image: "https://i.pravatar.cc/40?img=32" },
  { name: "Lucas Gomes", image: "https://i.pravatar.cc/40?img=4" },
  { name: "Laura Pereira Silva", image: "https://i.pravatar.cc/40?img=5" },
];

export function ParticipantsPanel() {
  return (
    <aside className="participants-panel">
      <h3 className="participants-title">Participantes</h3>

      <input
        type="text"
        className="participants-search"
        placeholder="Buscar participante"
      />

      <div className="participants-list">
        {participants.map((p) => (
          <div key={p.name} className="participant-item">
            <img
              src={p.image}
              alt={p.name}
              className="participant-avatar"
            />
            <span className="participant-name">{p.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
