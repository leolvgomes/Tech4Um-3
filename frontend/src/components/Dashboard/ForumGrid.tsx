import { useState, useEffect } from "react";
import { ForumCard } from "./ForumCard";
import "./ForumGrid.css";

type Room = {
  id: string;
  name: string;
  description?: string | null;
  membersCount?: number;
};

export function ForumGrid({ query }: { query?: string }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const base = "http://localhost:3333";

        // 1️⃣ Buscar todas as salas
        const res = await fetch(`${base}/rooms`, {
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

        const allRooms = await res.json();

        // 2️⃣ Buscar quantidade de membros de cada sala
        const roomsWithMembers = await Promise.all(
          allRooms.map(async (r: any) => {
            try {
              const membersRes = await fetch(`${base}/rooms/${r.id}`, {
                headers: {
                  ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
              });

              const members = membersRes.ok ? await membersRes.json() : [];
              return {
                id: r.id,
                name: r.name,
                description: r.description,
                membersCount: Array.isArray(members) ? members.length : 0,
              };
            } catch (err) {
              return {
                id: r.id,
                name: r.name,
                description: r.description,
                membersCount: 0,
              };
            }
          })
        );

        setRooms(roomsWithMembers);
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

  const q = (query || "").trim().toLowerCase();
  const filtered = q
    ? rooms.filter((r) =>
        r.name.toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q)
      )
    : rooms;

  return (
    <div className="forum-grid">
      {filtered.map((r) => (
        <ForumCard
          key={r.id}
          id={r.id}
          title={r.name}
          creator={""}
          people={r.membersCount ?? 0}
          highlight={false}
          description={r.description || ""}
        />
      ))}

      {filtered.length === 0 && (
        <div className="no-results">Nenhum fórum encontrado.</div>
      )}
    </div>
  );
}
