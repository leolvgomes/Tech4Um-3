import { useState } from "react";
import "./GroupsPanel.css";

const groups = [
  { title: "Teste1", creator: "Um Nome", members: 48 },
  { title: "Teste2", creator: "Um Nome", members: 55 },
  { title: "Teste3", creator: "Um Nome", members: 2 },
  { title: "Teste4", creator: "Um Nome", members: 12 },
  { title: "Teste5", creator: "Um Nome", members: 70 },
];

export function GroupsPanel() {
  return (
    <aside className="groups-panel">
      {groups.map((g) => (
        <div key={g.title} className="group-card">
          <h4 className="group-title">{g.title}</h4>
          <p className="group-sub">
            {g.creator} • {g.members} pessoas
          </p>
        </div>
      ))}
    </aside>
  );
}
