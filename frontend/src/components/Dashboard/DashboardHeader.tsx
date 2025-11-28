import { useState } from "react";
import "./DashboardHeader.css";

export function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="dashboard-title">
        <h1>Opa!</h1>
        <p>Sobre o que gostaria de falar hoje?</p>
      </div>

      <div className="dashboard-user">
        <span className="user-name">User</span>
        <img
          src="/user.jpg"
          className="user-avatar"
        />
      </div>
    </header>
  );
}
