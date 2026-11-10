import { Routes, Route } from "react-router"
import ComponentPreview from "./dev/componentPreview"
import "./app.css"

function App() {

  return (
    <>     
        <Routes>

          <Route path="preview" element={<ComponentPreview/>} />
        
        </Routes>
    </>
  )
}

export default App
