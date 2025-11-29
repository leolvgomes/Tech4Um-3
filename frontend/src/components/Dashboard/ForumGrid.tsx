import { useState, useEffect } from "react";
import { ForumCard } from "./ForumCard";
import "./ForumGrid.css";

type Room = {
  id: string;
  name: string;
  description?: string | null;
  created_at?: string;
};

export function ForumGrid() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3333/rooms", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setError(err.message || "Erro ao buscar fóruns");
          setRooms([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setRooms(data || []);
      } catch (err) {
        console.error("Erro ao buscar fóruns:", err);
        setError("Erro ao conectar com servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="forum-grid">Carregando fóruns...</div>;
  if (error) return <div className="forum-grid">{error}</div>;

  return (
    <div className="forum-grid">
      {rooms.map((r) => (
        <ForumCard
          key={r.id}
          id={r.id}
          title={r.name}
          creator={""}
          people={0}
          highlight={false}
          description={r.description || ""}
        />
      ))}
    </div>
  );
}
