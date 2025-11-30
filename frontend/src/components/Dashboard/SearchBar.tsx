import "./SearchBar.css";

import { useState } from "react";

interface SearchBarProps {
    abrirCriar: () => void;
    onSearch?: (query: string) => void;
}

export function SearchBar({ abrirCriar, onSearch }: SearchBarProps) {
    const [value, setValue] = useState("");

    function applySearch(q: string) {
        setValue(q);
        onSearch?.(q);
    }

    return (
        <div className="dashboard-search">
            <input
                type="text"
                placeholder="Em busca de uma sala? Encontre-a aqui"
                className="search-input"
                value={value}
                onChange={(e) => applySearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        applySearch(value);
                    }
                }}
            />

            <button
                className="search-button"
                onClick={() => applySearch(value)}
                aria-label="Pesquisar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>

            <button
                className="create-forum-button"
                onClick={abrirCriar}
            >
                Ou crie seu próprio 4um
            </button>

        </div>
    );
}
