import React from "react";

const AdminPanel = () => {
  const systemStats = {
    totalUsers: 524,
    activeUsers: 142,
    totalDiagnoses: 1260,
    aiAccuracy: "87%",
    flaggedCases: 12,
  };

  const flaggedCases = [
    { id: 1, user: "Jane Doe", symptoms: "Severe chest pain", risk: "High", action: "Immediate medical attention advised." },
    { id: 2, user: "Mark Smith", symptoms: "Shortness of breath", risk: "Moderate", action: "Consultation recommended." },
  ];

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <h4>System Overview</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">Total Users: {systemStats.totalUsers}</li>
        <li className="list-group-item">Active Users: {systemStats.activeUsers}</li>
        <li className="list-group-item">Total Diagnoses Made: {systemStats.totalDiagnoses}</li>
        <li className="list-group-item">AI Diagnosis Accuracy: {systemStats.aiAccuracy}</li>
        <li className="list-group-item">Flagged High-Risk Cases: {systemStats.flaggedCases}</li>
      </ul>

      <h4>Flagged High-Risk Cases</h4>
      <ul className="list-group">
        {flaggedCases.map((caseData) => (
          <li key={caseData.id} className="list-group-item">
            <strong>User:</strong> {caseData.user} <br />
            <strong>Symptoms:</strong> {caseData.symptoms} <br />
            <strong>Risk Level:</strong> <span className={caseData.risk === "High" ? "text-danger" : "text-warning"}>{caseData.risk}</span> <br />
            <strong>Action:</strong> {caseData.action}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
