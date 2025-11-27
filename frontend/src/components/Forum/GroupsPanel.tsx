import { useState } from "react";
import "./GroupsPanel.css";

const groups = [
  { title: "asdjejf", creator: "Um Nome", members: 48 },
  { title: "amsde", creator: "Um Nome", members: 55 },
  { title: "masde", creator: "Um Nome", members: 2 },
  { title: "tpgepr", creator: "Um Nome", members: 12 },
  { title: "asdpelf", creator: "Um Nome", members: 70 },
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
