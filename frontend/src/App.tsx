import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>} />
      </Routes>
     </Router>
  )
}

export default App
