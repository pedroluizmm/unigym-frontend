import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./LandingPage"
import StudentArea from "./StudentArea"
import ProfilePage from "./ProfilePage"
import SchedulePage from "./SchedulePage"
import LoginPage from "./LoginPage"
import "./index.css"

import "./LandingPage.css"
import "./StudentArea.css"
import "./ProfilePage.css"
import "./SchedulePage.css"
import "./LoginPage.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-area" element={<StudentArea />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
