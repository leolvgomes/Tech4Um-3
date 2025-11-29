import { useState } from "react";
import "./ModalCriarForum.css";
interface ModalCriarForumProps {
  aberto: boolean;
  fechar: () => void;
}

export default function ModalCriarForum({ aberto, fechar }: ModalCriarForumProps) {
  if (!aberto) return null;

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  function criarForum(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo.trim() || !descricao.trim() || !categoria.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    // Call backend to create the room and navigate to its chat page on success
    (async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3333/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ name: titulo, description: descricao }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Erro ao criar fórum:", data);
          alert(data.message || "Erro ao criar fórum");
          return;
        }

        // Expected backend response contains the created room (with `id`)
        const roomId = data.id || data.room?.id;

        alert("Fórum criado com sucesso!");
        fechar();

        if (roomId) {
          // Navigate to forum chat page. The app should provide a route like `/forum/:id`.
          window.location.href = `/forum/${roomId}`;
        } else {
          // Fallback: reload or open forum list
          window.location.reload();
        }
      } catch (err) {
        console.error("Erro ao criar fórum:", err);
        alert("Erro ao criar fórum. Tente novamente.");
      }
    })();
  }

  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="titulo">
          <h2>Crie um novo 4UM</h2>
        </div>

        <form onSubmit={criarForum}>
          <div className="camposForm">
            <label htmlFor="titulo">Título do fórum</label>
            <input
              className="entrada"
              type="text"
              value={titulo}
              placeholder="Ex: desenvolvimento-web, segurança, IA..."
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="camposForm">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              className="entrada textarea"
              value={descricao}
              placeholder="Descreva sobre o que é o seu fórum..."
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="camposForm">
            <label htmlFor="categoria">Categoria</label>
            <input
              className="entrada"
              type="text"
              value={categoria}
              placeholder="Ex: Front-end, Tech News, Dúvidas..."
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>

          <input className="botao" type="submit" value="Criar fórum" />
        </form>
      </div>
    </div>
  );
}
