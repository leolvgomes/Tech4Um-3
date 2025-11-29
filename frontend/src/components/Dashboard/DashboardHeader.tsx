import { useContext } from "react";
import "./DashboardHeader.css";
import { AuthContext } from "../../api/AuthContext";

export function DashboardHeader() {
  const { user } = useContext(AuthContext);

  return (
    <header className="dashboard-header">
      <div className="dashboard-title">
        <h1>Opa!</h1>
        <p>Sobre o que gostaria de falar hoje?</p>
      </div>

      <div className="dashboard-user">
        <span className="user-name">{user?.name ?? "Convidado"}</span>
        <img src="/user.jpg" className="user-avatar" />
      </div>
    </header>
  );
}
