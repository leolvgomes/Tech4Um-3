import { useState } from "react";
import "./CreateForum.css";

interface CreateForumProps {
  avatarUrl?: string;
}

export function CreateForum({ avatarUrl }: CreateForumProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setError(null);

    const trimmed = content.trim();

    if (!trimmed) {
      setError("Escreva algo antes de publicar.");
      return;
    }

    // Apenas front-end: não envia nada para servidor
    console.log("Post criado localmente:", trimmed);

    setContent(""); // limpa o input
  }

  return (
    <form className="create-forum" onSubmit={handleSubmit}>
      <div className="create-forum-left">
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="create-forum-avatar" />
        ) : (
          <div className="create-forum-avatar avatar-svg" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5E7488"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
        )}
      </div>

      <div className="create-forum-middle">
        <textarea
          className="create-forum-input"
          placeholder="Compartilhe o que está na sua mente..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
        />

        {error && <div className="create-forum-error">{error}</div>}
      </div>

      <div className="create-forum-right">
        <button
          type="submit"
          className="create-forum-button"
          disabled={content.trim().length === 0}
        >
          Publicar Post
        </button>
      </div>
    </form>
  );
}
