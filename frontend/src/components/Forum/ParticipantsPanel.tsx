import { useNavigate } from "react-router-dom";
import "./ParticipantsPanel.css";

interface Participant {
  id?: string;
  name: string;
}

export function ParticipantsPanel({ participants = [] }: { participants?: Participant[] }) {
  const navigate = useNavigate();

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
          {participants.map((p, idx) => (
            <div key={p.id ?? p.name ?? idx} className="participant-item">
              <img
                src={`https://i.pravatar.cc/40?u=${encodeURIComponent(p.name)}`}
                alt={p.name}
                className="participant-avatar"
              />
              <span className="participant-name">{p.name}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
