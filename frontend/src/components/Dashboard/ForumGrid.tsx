import { useState } from "react";
import { ForumCard } from "./ForumCard";
import "./ForumGrid.css";

const forums = [
  { title: "product-development-stuff", creator: "Lara Alves", people: 48, highlight: true },
  { title: "gente-maneira-discutindo-tema-maneiro", creator: "Um Nome", people: 70, highlight: false },
  { title: "Thinking about…", creator: "Um Nome", people: 70, highlight: false },
  { title: "#segurança", creator: "Um Nome", people: 70, highlight: false },
  { title: "Manda um nome maneiro para esse 4um", creator: "Um Nome", people: 10, highlight: false },
  { title: "Designers_na_firma", creator: "Lucas Gomes", people: 55, highlight: true },
  { title: "gamegamegame!", creator: "Um Nome", people: 10, highlight: false },
  { title: "E as férias?…", creator: "Um Nome", people: 10, highlight: false },
  { title: "Referências e Boas práticas", creator: "Um Nome", people: 70, highlight: false },
  { title: "Systemmmmm", creator: "Um Nome", people: 70, highlight: false },
  { title: "Tem_muita_coisa_…", creator: "Um Nome", people: 70, highlight: false },
];

export function ForumGrid() {
  return (
    <div className="forum-grid">
      {forums.map((f, i) => (
        <ForumCard key={i} {...f} />
      ))}
    </div>
  );
}
