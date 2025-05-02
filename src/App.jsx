import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero, Navbar, Companies, Feedback, Footer } from './components';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={
          <>
            <Hero />
            <Companies />
            <Feedback />
            <Footer />
            
          </>
        } />
        
        {/* Login & Signup Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
