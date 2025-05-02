import React from 'react';
import { useFormData } from '../components/FormContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { entries } = useFormData();

  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="flex flex-wrap gap-4 mb-10">
          {['Symptoms', 'Medications', 'Exercise', 'Diet'].map((tab) => (
            <button
              key={tab}
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:shadow-md"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500">No recent activity yet.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <Link to="/intake" className="text-[#20B486] font-medium hover:underline text-sm">
                + Add Entry
              </Link>
            </div>

            {entries.length === 0 ? (
              <p className="text-gray-500">No entries yet.</p>
            ) : (
              <ul className="space-y-2">
                {entries.map((entry, idx) => (
                  <li key={idx} className="p-3 bg-[#f0fdf4] rounded-md border">
                    <h3 className="text-md font-bold">{entry.title}</h3>
                    <p className="text-sm text-gray-700">{entry.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
