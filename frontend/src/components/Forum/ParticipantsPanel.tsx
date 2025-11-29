import { useNavigate } from "react-router-dom";
import "./ParticipantsPanel.css";
import type { Participant } from "../../types";

interface ParticipantsPanelProps {
  participants: Participant[];
  selectedUser: string | null;
  onSelectUser: (userId: string | null) => void;
}

export function ParticipantsPanel({ participants, selectedUser, onSelectUser }: ParticipantsPanelProps) {
  const navigate = useNavigate();

  function selecionar(userId: string) {
    onSelectUser(userId);
  }

  return (
    <div className="participants-wrapper">
      <div className="participants-back-container">
        <button
          type="button"
          className="participants-back"
          onClick={() => navigate('/')}
          aria-label="Voltar para a dashboard"
        >
          <span className="participants-back-arrow">←</span>
          <span className="participants-back-text">Voltar para a dashboard</span>
        </button>
      </div>

      <aside className="participants-panel">
        <h3 className="participants-title">Participantes</h3>

        <input
          type="text"
          className="participants-search"
          placeholder="Buscar participante"
        />

        <div className="participants-list">
          {participants.map((p) => (
            <div
              key={p.id}
              className={`participant-item ${selectedUser === p.user_id ? "selected" : ""}`}
              onClick={() => selecionar(p.user_id)}
            >
              <img
                src={`https://i.pravatar.cc/40?u=${p.user_id}`}
                alt={p.user.name}
                className="participant-avatar"
              />
              <span className="participant-name">{p.user.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
