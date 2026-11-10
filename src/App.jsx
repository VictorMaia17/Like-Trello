import { Routes, Route } from "react-router"
import ComponentPreview from "./dev/componentPreview"
import Login from "./pages/login"
import "./app.css"

function App() {

  return (
    <>     
        <Routes>

          <Route path="preview" element={<ComponentPreview/>} />
          <Route path="login" element={<Login/>} />

        </Routes>
    </>
  )
}

export default App
