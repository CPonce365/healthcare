import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Hero, Navbar, Companies, Feedback, Footer } from './components';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard';
import IntakeForm from './components/IntakeForm';
import { FormProvider } from './components/FormContext';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Companies />
              <Feedback />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/intake" element={<IntakeForm />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <FormProvider>
        <AppContent />
      </FormProvider>
    </Router>
  );
};

export default App;
