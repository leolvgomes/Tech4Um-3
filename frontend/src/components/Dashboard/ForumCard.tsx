import { useNavigate } from "react-router-dom";
import "./ForumCard.css";
import { useState } from "react";

interface ForumCardProps {
  id?: string;
  title: string;
  creator?: string;
  people?: number;
  highlight?: boolean;
  description?: string;
}

export function ForumCard({
  id,
  title,
  creator = "",
  people = 0,
  highlight = false,
  description = "",
}: ForumCardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function enter() {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para entrar no fórum.");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Verifica se já é membro da sala
      const membersRes = await fetch(`http://localhost:3333/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let members: any[] = [];
      try {
        members = membersRes.ok ? await membersRes.json() : [];
      } catch (err) {
        members = [];
      }

      // decodifica token pra pegar email
      const userData = JSON.parse(atob(token.split(".")[1]));
      const userEmail = userData.email;

      const jaMembro = members.some((m: any) => m.user?.email === userEmail);

      // 2️⃣ Se já está na sala → só navega
      if (jaMembro) {
        navigate(`/rooms/${id}`, { state: { fromDashboard: true } });
        return;
      }

      // 3️⃣ Senão, entra na sala chamando o backend
      const resp = await fetch(`http://localhost:3333/rooms/${id}/entrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        console.error(await resp.text());
        alert("Erro ao entrar no fórum.");
        return;
      }

      // 4️⃣ Agora navega
      navigate(`/rooms/${id}`, { state: { fromDashboard: true } });

    } catch (err) {
      console.error("Erro ao entrar:", err);
      alert("Não foi possível entrar no fórum.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`forum-card ${highlight ? "highlight" : ""}`}>
      {highlight && (
        <span className="forum-highlight-tag">Tópico em destaque!</span>
      )}

      <h2 className="forum-title">{title}</h2>

      <span className="forum-people">{people} pessoas</span>

      <p className="forum-description">
        {description || "Sem descrição disponível."}
      </p>

      {creator && (
        <span className="forum-creator">
          Criado por: <b>{creator}</b>
        </span>
      )}

      <button
        className="forum-enter"
        onClick={enter}
        disabled={loading}
        aria-label={`Entrar no fórum ${title}`}
      >
        {loading ? "..." : "↪"}
      </button>
    </div>
  );
}
