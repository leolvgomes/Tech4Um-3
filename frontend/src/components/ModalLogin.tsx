import { useState, useContext } from "react";
import "./Modal.css";
import logo from "../assets/img/Logo.png";
import { AuthContext } from "../api/AuthContext";

interface ModalLoginProps {
  aberto: boolean;
  fechar: () => void;
  trocarParaCadastro: () => void;
}

export default function ModalLogin({ aberto, fechar, trocarParaCadastro }: ModalLoginProps) {
  if (!aberto) return null;

  const { login } = useContext(AuthContext); // <-- PEGAR LOGIN DO CONTEXTO

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function logar(e: React.FormEvent) {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3333/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const dados = await resposta.json();
      console.log("Usuário logado:", dados);

      if (!resposta.ok) {
        alert("Email ou senha inválidos!");
        return;
      }

      // CHAMA O CONTEXTO → ATUALIZA O HEADER NA HORA
      login(dados.token, dados.user);

      alert("Login realizado com sucesso!");
      fechar();

    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="titulo">
          <h2>Faça login no</h2>
          <img src={logo} alt="" />
        </div>

        <form onSubmit={logar}>
          <div className="camposForm">
            <label htmlFor="email">E-mail</label>
            <input
              className="entrada"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="camposForm">
            <label htmlFor="password">Senha</label>
            <input
              className="entrada"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input className="botao" type="submit" value="Entrar" />
        </form>

        <h3>
          Ainda não possui uma conta?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              trocarParaCadastro();
            }}
          >
            Clique aqui para se registrar
          </a>
        </h3>
      </div>
    </div>
  );
}
