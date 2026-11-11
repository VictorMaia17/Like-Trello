import { Routes, Route, Navigate } from "react-router"
import ComponentPreview from "./dev/componentPreview"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard" 
import PaginaProjeto from "./pages/PaginaProjeto" // Vamos criar essa página
import "./app.css"

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/preview" element={<ComponentPreview />} />
      
      {/* Rota Dinâmica para o projeto */}
      <Route path="/projeto/:nome" element={<PaginaProjeto />} />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
export default App