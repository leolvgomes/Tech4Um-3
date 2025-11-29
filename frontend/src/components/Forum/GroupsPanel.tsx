import { useState, useEffect, useContext } from "react";
import "./GroupsPanel.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthContext";

interface RoomItem {
  id: string;
  name: string;
  description?: string;
  membersCount?: number;
}

export function GroupsPanel() {
  const { token, user } = useContext(AuthContext);
  const userName = user?.name ?? "";
  const userEmail = (user as any)?.email ?? "";
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userName) {
      setRooms([]);
      return;
    }

    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const base = "http://localhost:3333";
        const roomsRes = await fetch(`${base}/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!roomsRes.ok) {
          throw new Error("Erro ao buscar salas");
        }

        const allRooms = await roomsRes.json();

        // For each room, fetch members and messages; include room if user is member or has sent messages
        const checks = await Promise.all(
          allRooms.map(async (r: any) => {
            try {
              const [membersRes, messagesRes] = await Promise.all([
                fetch(`${base}/rooms/${r.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${base}/messages/${r.id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                }),
              ]);

              const members = membersRes.ok ? await membersRes.json() : [];
              const messages = messagesRes.ok ? await messagesRes.json() : [];

              const isMember = members.some((m: any) => m.user?.name === userName);
              const hasMessages = messages.some((m: any) => m.sender?.email === userEmail);

              return {
                room: r,
                membersCount: Array.isArray(members) ? members.length : 0,
                include: isMember || hasMessages,
              };
            } catch (err) {
              return { room: r, membersCount: 0, include: false };
            }
          })
        );

        const interacted = checks
          .filter((c) => c.include)
          .map((c) => ({
            id: c.room.id,
            name: c.room.name,
            description: c.room.description,
            membersCount: c.membersCount,
          }));

        if (mounted) setRooms(interacted);
      } catch (err: any) {
        if (mounted) setError(err.message || "Erro ao carregar fóruns");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [token, userName, userEmail]);

  if (!token || !user) {
    return (
      <aside className="groups-panel">
        <p>Entre para ver os fóruns que você já participou.</p>
      </aside>
    );
  }

  return (
    <aside className="groups-panel">
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && rooms.length === 0 && (
        <p>Você ainda não participou de nenhum fórum.</p>
      )}
      {!loading && !error &&
        rooms.map((g) => (
          <button
            key={g.id}
            type="button"
            className="group-card group-card-button"
            onClick={() => navigate(`/forum/${g.id}`, { state: { fromDashboard: true } })}
            aria-label={`Abrir fórum ${g.name}`}
          >
            <h4 className="group-title">{g.name}</h4>
            <p className="group-sub">{g.description || "Sem descrição"} • {g.membersCount ?? 0} pessoas</p>
          </button>
        ))}
    </aside>
  );
}
