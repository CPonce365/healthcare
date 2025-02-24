import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/ChatBot";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SymptomInput from "./pages/SymptomInput";
import DiagnosisResults from "./pages/DiagnosisResults";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import "./styles/custom.css";
import "./styles/chatbot.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/symptoms" element={<SymptomInput />} />
          <Route path="/results" element={<DiagnosisResults />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
      <Chatbot />
    </Router>
  );
}

export default App;
