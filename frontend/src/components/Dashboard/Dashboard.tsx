import { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { SearchBar } from "./SearchBar";
import { ForumGrid } from "./ForumGrid";
import ModalCriarForum from "./ModalCriarForum";
import "./Dashboard.css";

export function Dashboard() {
    const [modalAberto, setModalAberto] = useState(false);
    return (
        <div className="dashboard-page">
            <DashboardHeader />

            <SearchBar abrirCriar={() => setModalAberto(true)} />

            <ForumGrid />

            <ModalCriarForum
                aberto={modalAberto}
                fechar={() => setModalAberto(false)}
            />

        </div>
    );
}
