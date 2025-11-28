import "./SearchBar.css";

interface SearchBarProps {
    abrirCriar: () => void;
}

export function SearchBar({ abrirCriar }: SearchBarProps) {
    return (
        <div className="dashboard-search">
            <input
                type="text"
                placeholder="Em busca de uma sala? Encontre-a aqui"
                className="search-input"
            />

            <button className="search-button">
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
