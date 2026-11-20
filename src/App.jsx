import { useState } from "react"
import { Routes, Route, Navigate } from "react-router"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import PaginaProjeto from "./pages/PaginaProjeto" // Vamos criar essa página
import CreateProject from "./components/projects/formField/CreateProject"
import EditProject from "./components/projects/formField/EditProject"
import "./app.css"

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Projeto Alpha",
      description: "Desenvolvimento da nova interface.",
      progress: 75,
    },
    {
      id: 2,
      name: "Projeto Beta",
      description: "Migração de banco de dados legado.",
      progress: 30,
    },
    {
      id: 3,
      name: "Marketing Q4",
      description: "Campanha de lançamento de final de ano.",
      progress: 90,
    },
  ])

  function saveProject(project) {
    setProjects((current) => {
      const exists = current.some((p) => p.id === project.id)
      return exists
        ? current.map((p) => (p.id === project.id ? project : p))
        : [...current, project]
    })
  }

  function toggleArchive(id) {
    setProjects((current) =>
      current.map((p) => (p.id === id ? { ...p, archived: !p.archived } : p))
    )
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={<Dashboard projects={projects} onToggleArchive={toggleArchive} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      <Route
        path="/projects/crud"
        element={<CreateProject onSave={saveProject} />}
      />

      <Route
        path="/projects/:id/edit"
        element={<EditProject projects={projects} onSave={saveProject} />}
      />

      {/* Rota Dinâmica para o projeto */}
      <Route path="/projeto/:nome" element={<PaginaProjeto />} />

      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
export default App