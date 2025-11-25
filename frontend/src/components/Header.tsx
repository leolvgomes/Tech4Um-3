import { useState } from "react";
import "./Header.css";
import logo from "../assets/img/Logo.png";
import person from "../assets/img/person_24dp_5E7488_FILL0_wght400_GRAD0_opsz24.png";
import ModalLogin from "./ModalLogin";
import ModalCadastro from "./ModalCadastro";

export function Header() {
  const [modalLoginAberto, setModalLoginAberto] = useState(false);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);

  function trocarParaCadastro() {
    setModalLoginAberto(false);
    setModalCadastroAberto(true);
  };

  function trocarParaLogin() {
    setModalLoginAberto(true);
    setModalCadastroAberto(false);
  };


  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />

        <nav>
          <button className="login-btn" onClick={() => setModalLoginAberto(true)}>
            <img src={person} alt="Login" id="loginIcon" />
            <h2>Login</h2>
          </button>
        </nav>
      </header>
      <ModalLogin 
      aberto={modalLoginAberto} 
      fechar={() => setModalLoginAberto(false)}
      trocarParaCadastro = {trocarParaCadastro}
      />
      <ModalCadastro
      aberto={modalCadastroAberto}
      fechar={()=>setModalCadastroAberto(false)}
      trocarParaLogin={trocarParaLogin}
      />
    </>
  );
}
