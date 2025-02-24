import React, { useState } from "react";

const DiagnosisResults = () => {
  const [diagnosisData] = useState([
    { condition: "Flu", probability: "85%", advice: "Rest, stay hydrated, and take fever-reducing medicine." },
    { condition: "Common Cold", probability: "75%", advice: "Drink warm fluids and take over-the-counter cold medicine." },
    { condition: "Allergic Rhinitis", probability: "65%", advice: "Avoid allergens and take antihistamines." },
  ]);

  return (
    <div className="container">
      <h2>AI Diagnosis Results</h2>
      <p>The AI analyzed your symptoms and found the following possible conditions:</p>
      <ul className="list-group">
        {diagnosisData.map((result, index) => (
          <li key={index} className="list-group-item">
            <strong>{result.condition}</strong> - Probability: {result.probability}
            <br />
            <small><em>Advice: {result.advice}</em></small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisResults;
