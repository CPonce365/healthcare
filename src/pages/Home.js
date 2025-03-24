import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AI-Powered Healthcare</h1>
          <p className="hero-subtitle">
            Enter your symptoms and receive AI-based insights into possible conditions.
          </p>
          <Link to="/symptoms">
            <button className="hero-btn mt-3">Start Symptom Check</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
