import { useState } from "react";
import "./ForumCard.css";

interface ForumCardProps {
  title: string;
  creator: string;
  people: number;
  highlight: boolean;
}

export function ForumCard({ title, creator, people, highlight }: ForumCardProps) {
  return (
    <div className={`forum-card ${highlight ? "highlight" : ""}`}>
      
      {highlight && (
        <span className="forum-highlight-tag">Tópico em destaque!</span>
      )}

      <h2 className="forum-title">{title}</h2>

      <span className="forum-people">{people} pessoas</span>

      <p className="forum-description">
        O que temos de bom nessa sala, pessoal? Bora falar...
      </p>

      <span className="forum-creator">
        Criado por: <b>{creator}</b>
      </span>

      <button className="forum-enter">↪</button>
    </div>
  );
}
