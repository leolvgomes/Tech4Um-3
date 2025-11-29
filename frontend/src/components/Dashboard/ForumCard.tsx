import { useNavigate } from "react-router-dom";
import "./ForumCard.css";

interface ForumCardProps {
  id?: string;
  title: string;
  creator?: string;
  people?: number;
  highlight?: boolean;
  description?: string;
}

export function ForumCard({ id, title, creator = "", people = 0, highlight = false, description = "" }: ForumCardProps) {
  const navigate = useNavigate();

  function enter() {
    if (!id) return;
    // navigate with a small state flag so ForumPage knows navigation came from dashboard
    navigate(`/forum/${id}`, { state: { fromDashboard: true } });
  }

  return (
    <div className={`forum-card ${highlight ? "highlight" : ""}`}>
      {highlight && (
        <span className="forum-highlight-tag">Tópico em destaque!</span>
      )}

      <h2 className="forum-title">{title}</h2>

      <span className="forum-people">{people} pessoas</span>

      <p className="forum-description">{description || "O que temos de bom nessa sala, pessoal? Bora falar..."}</p>

      {creator && (
        <span className="forum-creator">
          Criado por: <b>{creator}</b>
        </span>
      )}

      <button className="forum-enter" onClick={enter} aria-label={`Entrar no fórum ${title}`}>
        ↪
      </button>
    </div>
  );
}
