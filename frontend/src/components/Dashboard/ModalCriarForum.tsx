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

    console.log("Fórum criado:", { titulo, descricao, categoria });

    alert("Fórum criado com sucesso!");
    fechar();
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
