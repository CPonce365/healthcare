import React, { useState } from "react";

const SymptomInput = () => {
  const [symptoms, setSymptoms] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const commonSymptoms = [
    "Fever", "Cough", "Headache", "Fatigue", "Nausea",
    "Sore Throat", "Shortness of Breath", "Chest Pain"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Symptoms submitted for AI analysis!");
  };

  return (
    <div className="container">
      <h2>Check Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Describe your symptoms..."
          rows="4"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        ></textarea>
        
        <h5>Common Symptoms</h5>
        <ul className="list-group mb-3">
          {commonSymptoms.map((symptom, index) => (
            <li key={index} className="list-group-item" onClick={() => setSymptoms(symptoms + (symptoms ? ", " : "") + symptom)}>
              {symptom}
            </li>
          ))}
        </ul>

        <button className="btn btn-primary mt-3">Submit</button>
      </form>

      {submitted && <p className="text-success mt-3">Your symptoms have been submitted!</p>}
    </div>
  );
};

export default SymptomInput;
