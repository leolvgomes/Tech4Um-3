"use client";

import { useState } from "react";
import "./Header.css";
import logo from "../assets/img/Logo.png";
import person from "../assets/img/person_24dp_5E7488_FILL0_wght400_GRAD0_opsz24.png";
import login from "../assets/img/login.png"
import logoutImg from "../assets/img/logout.svg"
import ModalLogin from "./ModalLogin";
import ModalCadastro from "./ModalCadastro";
import { useContext } from "react";
import { AuthContext } from "../api/AuthContext";


export function Header() {
    const { logout, user } = useContext(AuthContext);

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
          {user?(
            
          <button className="login-btn" onClick={logout}>
            <img src={person} alt="Login" id="loginIcon" />
            <h2>{user.name}</h2>
           <img src={login} alt="Login" id="loginIcon" />

          </button>
          ):(
            <button className="login-btn" onClick={() => setModalLoginAberto(true)}>
            <img src={person} alt="Login" id="loginIcon" />
            <h2>Login</h2>
            <img src={logoutImg} alt="Login" id="loginIcon" />

          </button>
          )
        }

          
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
