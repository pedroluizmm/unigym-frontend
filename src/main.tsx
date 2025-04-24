import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import StudentArea from "./StudentArea"
import "./LandingPage.css"
import "./StudentArea.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-area" element={<StudentArea />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
