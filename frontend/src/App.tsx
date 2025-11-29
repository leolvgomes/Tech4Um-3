import { Header } from "./components/Header";
import { ForumPage } from "./components/Forum/ForumPage";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms/:id" element={<ForumPage />} />
      </Routes>
    </>
  );
}

export default App
