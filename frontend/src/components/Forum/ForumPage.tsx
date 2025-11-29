import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { createSocket } from "../../api/socket";
import { ParticipantsPanel } from "./ParticipantsPanel";
import { ChatPanel } from "./ChatPanel";
import { GroupsPanel } from "./GroupsPanel";
import "./ForumPage.css";

type Message = {
  id: string;
  content: string;
  created_at: string;
  sender?: { id?: string; name?: string; email?: string };
};

export function ForumPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [members, setMembers] = useState<{ id?: string; name: string }[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!id) return;

    // Guard: only allow direct access when navigation state indicates origin from dashboard or creation flow
    const allowed = (location && (location.state as any)?.fromDashboard) ?? false;
    if (!allowed) {
      // redirect back to dashboard
      navigate("/");
      return;
    }

    const token = localStorage.getItem("token");

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch room list to get room name/description (no room detail endpoint available)
        const roomsRes = await fetch("http://localhost:3333/rooms", {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const rooms = await roomsRes.json().catch(() => []);
        const room = (rooms || []).find((r: any) => r.id === id);
        if (room) {
          setRoomName(room.name || "");
        }

        // Fetch members
        const membersRes = await fetch(`http://localhost:3333/rooms/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (membersRes.ok) {
          const membersData = await membersRes.json();
          // membersData is an array of RoomUser with included user.name
          const mapped = (membersData || []).map((m: any) => ({ id: m.id, name: m.user?.name || "" }));
          setMembers(mapped);
        }

        // Fetch messages
        const messagesRes = await fetch(`http://localhost:3333/messages/${id}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (messagesRes.ok) {
          const msgs = await messagesRes.json();
          setMessages(msgs || []);
        }
      } catch (err) {
        console.error("Erro ao carregar fórum:", err);
        setError("Erro ao carregar fórum");
      } finally {
        setLoading(false);
      }
    };

    let s: any | null = null;
    fetchData().then(() => {
      try {
        const token = localStorage.getItem("token");
        s = createSocket(token || undefined);
        socketRef.current = s;

        s.emit("join_room", id);

        const onMessage = (message: any) => {
          setMessages((prev) => [...prev, message]);
        };

        s.on("message_received", onMessage);

        // store for cleanup via ref
        (socketRef as any).onMessage = onMessage;
      } catch (err) {
        console.error("Erro ao conectar socket:", err);
      }
    });

    return () => {
      if (s) {
        const onMessage = (socketRef as any).onMessage;
        if (onMessage) s.off("message_received", onMessage);
      }
    };
  }, [id]);

  if (!id) return <div>Fórum inválido</div>;
  if (loading) return <div>Carregando fórum...</div>;
  if (error) return <div>{error}</div>;

  function sendMessage(content: string) {
    const socket = socketRef.current;
    if (!socket) {
      console.error("Socket não conectado");
      return;
    }

    socket.emit("message", { room_id: id, content });
  }

  return (
    <div className="forum-container">
      <ParticipantsPanel participants={members} />
      <ChatPanel roomName={roomName} createdBy={members[0]?.name || ""} messages={messages} onSend={sendMessage} />
      <GroupsPanel />
    </div>
  );
}
