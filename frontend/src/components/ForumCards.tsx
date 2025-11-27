import { useState } from "react";
import "./ForumCards.css";

interface ForumCardsProps {
  titulo?: string;
  tags?: string[];
  usuario?: string;
  tempo?: string;
  views?: string;
  likes?: string;
  comentarios?: string;
}

export function ForumCards({
  titulo = "Título padrão",
  tags = ["geral"],
  usuario = "Usuário",
  tempo = "agora",
  views = "0",
  likes = "0",
  comentarios = "0",
}: ForumCardsProps) {
  const [favorito, setFavorito] = useState(false);

  function toggleFavorito() {
    setFavorito(!favorito);
  }

  return (
    <div className="forumcard-card">
      <div className="forumcard-image" />

      <div className="forumcard-content">
        <h2 className="forumcard-title">{titulo}</h2>

        <div className="forumcard-tags">
          {tags.map((tag, index) => (
            <span key={index} className="forumcard-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="forumcard-user-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2e2e2e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="forumcard-user-avatar"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
          </svg>

          <div>
            <p className="forumcard-user-name">{usuario} •</p>
            <p className="forumcard-time">{tempo}</p>
          </div>
        </div>

        <div className="forumcard-stats">
          <span>{views} views</span>
          <span>{likes} curtidas</span>
          <span>{comentarios} comentários</span>
        </div>
      </div>

      <div className="forumcard-favorite" onClick={toggleFavorito}>
        {favorito ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="red"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655" />
            <path d="m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761" />
            <path d="m2 2 20 20" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5E7488"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="heart-normal"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        )}
      </div>
    </div>
  );
}
