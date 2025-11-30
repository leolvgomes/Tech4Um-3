import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { SearchBar } from "./SearchBar";
import { ForumGrid } from "./ForumGrid";
import ModalCriarForum from "./ModalCriarForum";
import "./Dashboard.css";

export function Dashboard() {
    const [modalAberto, setModalAberto] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="dashboard-page">
            <DashboardHeader />

            <SearchBar abrirCriar={() => setModalAberto(true)} onSearch={(q) => setSearchQuery(q)} />

            <ForumGrid query={searchQuery} />

            <ModalCriarForum
                aberto={modalAberto}
                fechar={() => setModalAberto(false)}
            />

        </div>
    );
}
