import React from "react";

const Dashboard = () => {
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    pastSymptoms: [
      { date: "2024-02-15", symptoms: "Fever, headache", diagnosis: "Possible Flu", advice: "Drink fluids, rest, consult a doctor if symptoms persist." },
      { date: "2024-02-08", symptoms: "Cough, sore throat", diagnosis: "Mild Cold", advice: "Take warm fluids and lozenges." },
      { date: "2024-01-30", symptoms: "Chest pain, fatigue", diagnosis: "Consult a physician immediately", advice: "Emergency checkup recommended." }
    ],
  };

  return (
    <div className="container">
      <h2>Welcome, {userData.name}</h2>
      <p>Email: {userData.email}</p>
      <h3>Past Symptom Entries</h3>
      <ul className="list-group">
        {userData.pastSymptoms.map((entry, index) => (
          <li key={index} className="list-group-item">
            <strong>{entry.date}</strong>: {entry.symptoms} → <span className="text-primary">{entry.diagnosis}</span>
            <br />
            <small><em>{entry.advice}</em></small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
