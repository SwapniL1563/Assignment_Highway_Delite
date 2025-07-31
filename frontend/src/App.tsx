import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
     </Router>
  )
}

export default App
