import { useState } from "react";
import "./Modal.css"
import logo from "../assets/img/Logo.png";

interface ModalCadastroProps {
  aberto: boolean;
  fechar: () => void;
  trocarParaLogin: ()=> void;
}

export default function ModalCadastro({ aberto, fechar, trocarParaLogin }: ModalCadastroProps) {
    if (!aberto) return null;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");



    async function registrar(e: React.FormEvent) {
    e.preventDefault();

    if (password !== password2) {
    alert("As senhas não coincidem!");
    return; 
  }

try {
      const resposta = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const dados = await resposta.json();
      console.log("Usuário criado:", dados);

      alert("Usuário cadastrado com sucesso!");

      fechar(); // fecha modal após cadastrar
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Erro ao cadastrar!");
    }
  

  }

    return (
        <div className="modal-overlay" onClick={fechar}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="titulo">
                <h2>Crie sua conta no</h2>
                <img src={logo} alt="" />
            </div>
            <form onSubmit={registrar}>
                <div className="camposForm">
                    <label htmlFor="name">Nome</label>
                    <input className="entrada" type="text" value={name} placeholder="Nome" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="camposForm">
                    <label htmlFor="email">E-mail</label>
                    <input className="entrada" type="text" value={email} placeholder="nome@email.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="camposForm">
                    <label htmlFor="password">Senha</label>
                <input className="entrada" type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="camposForm">
                    <label htmlFor="password2">Senha</label>
                <input className="entrada" type="password" value={password2} placeholder="Repita a senha" onChange={(e) => setPassword2(e.target.value)} />
                </div>
                
                <input className="botao" type="submit" value="Criar conta"/>
            </form>
            <h3>Já tem uma conta? <a href="#"onClick={e => { e.preventDefault(); trocarParaLogin(); }}>Clique aqui para fazer login</a> </h3>
        </div>
        </div>
    );
}
