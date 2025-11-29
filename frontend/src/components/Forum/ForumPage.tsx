import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ParticipantsPanel } from "./ParticipantsPanel";
import { ChatPanel } from "./ChatPanel";
import { GroupsPanel } from "./GroupsPanel";
import type { Participant } from "../../types";
import "./ForumPage.css";

export function ForumPage() {
  const { id: roomId } = useParams<{ id: string }>(); // pega o ID da URL
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Carregar participantes da sala
  useEffect(() => {
    if (!roomId) return;

    async function carregarParticipantes() {
      try {
        const resp = await fetch(`http://localhost:3333/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await resp.json();
        if (Array.isArray(data)) setParticipants(data);
      } catch (err) {
        console.error("Erro ao buscar participantes:", err);
      }
    }

    carregarParticipantes();
  }, [roomId]);

  if (!roomId) return <div>Fórum inválido</div>;

  return (
    <div className="forum-container">
      <ParticipantsPanel
        participants={participants}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatPanel
        roomId={roomId}
        participants={participants}
        selectedUser={selectedUser}
      />
      <GroupsPanel />
    </div>
  );
}
