import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-10">
          {['Symptoms', 'Medications', 'Exercise', 'Diet'].map((tab) => (
            <button
              key={tab}
              className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:shadow-md transition"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <p className="text-gray-500">No recent activity yet.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <p className="text-gray-500">You can add shortcuts here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
