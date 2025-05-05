import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
        fetchEntries(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Fetch Firestore entries for current user
  const fetchEntries = async (uid) => {
    const q = query(collection(db, 'intakeForms'), where('userId', '==', uid));
    try {
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(data);
    } catch (err) {
      console.error('Failed to fetch entries:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteDoc(doc(db, 'intakeForms', id));
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Placeholder for future */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500">No recent activity yet.</p>
          </div>

          {/* Right: Entry List */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <Link
                to="/intake"
                className="text-[#20B486] font-medium hover:underline text-sm"
              >
                + Add Entry
              </Link>
            </div>

            {entries.length === 0 ? (
              <p className="text-gray-500">No entries yet.</p>
            ) : (
              <ul className="space-y-2">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="p-3 bg-[#f0fdf4] rounded-md border flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-md font-bold">
                        {entry.title ||
                          `${entry.firstName ?? ''} ${entry.lastName ?? ''}`}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {entry.symptoms || 'No symptoms provided.'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot always on screen */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
