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
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. Auth listener
useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser); // ✅ Only set user here
    }
  });
  return () => unsubscribe();
}, [navigate]);

// 2. Fetch entries AFTER user is set
useEffect(() => {
  if (user) {
    fetchEntries(user.uid); 
  }
}, [user]);


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

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setEditForm({ ...entry });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submitEdit = async () => {
    try {
      await updateDoc(doc(db, 'intakeForms', editingEntry.id), editForm);
      setEditingEntry(null);
      fetchEntries(user.uid);
    } catch (err) {
      console.error('Failed to update entry:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          
        </div>

        <div className="flex flex-wrap gap-4 mb-10">
          {['Symptoms', 'Medications', 'Exercise', 'Diet'].map((tab) =>
            tab === 'Symptoms' ? (
              <Link
                key={tab}
                to="/symptoms"
                className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:shadow-md"
              >
                {tab}
              </Link>
            ) : (
              <button
                key={tab}
                className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-lg font-medium hover:shadow-md"
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-gray-500">No recent activity yet.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">General Health Intake Form</h2>
              <Link to="/intake" className="text-[#20B486] font-medium hover:underline text-sm">
                + Add Entry
              </Link>
            </div>

            {entries.length === 0 ? (
              <p className="text-gray-500">No entries yet.</p>
            ) : (
              <ul className="space-y-2">
                {entries.map((entry) => (
                  <li key={entry.id} className="p-3 bg-[#f0fdf4] rounded-md border flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-bold">{entry.fullName || 'No name provided'}</h3>
                      <p className="text-sm text-gray-700">{entry.dateOfBirth || 'No DOB provided.'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(entry)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg space-y-4">
            <h3 className="text-lg font-bold mb-4">Edit Intake Form</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="fullName" value={editForm.fullName || ''} onChange={handleEditChange} className="border p-2 rounded-md" placeholder="Full Name" />
              <input type="date" name="dateOfBirth" value={editForm.dateOfBirth || ''} onChange={handleEditChange} className="border p-2 rounded-md" />
              <select name="gender" value={editForm.gender || ''} onChange={handleEditChange} className="border p-2 rounded-md">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
              <input name="contactInfo" value={editForm.contactInfo || ''} onChange={handleEditChange} placeholder="Contact Info" className="border p-2 rounded-md" />
              <input name="emergencyContact" value={editForm.emergencyContact || ''} onChange={handleEditChange} placeholder="Emergency Contact" className="border p-2 rounded-md" />
              <input name="primaryCarePhysician" value={editForm.primaryCarePhysician || ''} onChange={handleEditChange} placeholder="Primary Care Physician" className="border p-2 rounded-md" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="smoking" checked={editForm.smoking || false} onChange={handleEditChange} />
                Do you smoke?
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="alcohol" checked={editForm.alcohol || false} onChange={handleEditChange} />
                Do you consume alcohol?
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="drugs" checked={editForm.drugs || false} onChange={handleEditChange} />
                Use recreational drugs?
              </label>
              <input name="exercise" value={editForm.exercise || ''} onChange={handleEditChange} placeholder="Exercise frequency" className="border p-2 rounded-md" />
              <input name="sleep" value={editForm.sleep || ''} onChange={handleEditChange} placeholder="Sleep quality" className="border p-2 rounded-md" />
              <textarea name="diagnosedConditions" value={editForm.diagnosedConditions || ''} onChange={handleEditChange} placeholder="Diagnosed Conditions" className="border p-2 rounded-md col-span-2" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="covidHistory" checked={editForm.covidHistory || false} onChange={handleEditChange} />
                Had COVID in the past 3 months?
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="recentTravel" checked={editForm.recentTravel || false} onChange={handleEditChange} />
                Traveled recently?
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="hasInsurance" checked={editForm.hasInsurance || false} onChange={handleEditChange} />
                Do you have health insurance?
              </label>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditingEntry(null)} className="px-4 py-2 border rounded-md text-gray-700">Cancel</button>
              <button onClick={submitEdit} className="px-4 py-2 bg-green-600 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default Dashboard;
