import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Symptoms = () => {
  const [symptomsList, setSymptomsList] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [user, setUser] = useState(null);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate('/login');
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    if (user) fetchSymptoms();
  }, [user]);

  const fetchSymptoms = async () => {
    const q = query(collection(db, 'symptomEntries'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const sorted = data.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
    setSymptomsList(sorted);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'symptomEntries', id));
    fetchSymptoms();
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
    await updateDoc(doc(db, 'symptomEntries', editingEntry.id), editForm);
    setEditingEntry(null);
    fetchSymptoms();
  };

  const runAiAnalysis = async () => {
    setLoading(true);
    setAiSummary('');
    try {
      const response = await fetch('http://localhost:5001/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: symptomsList }),
      });
      const data = await response.json();
      setAiSummary(data.summary);
    } catch (err) {
      console.error('AI analysis failed', err);
      setAiSummary('⚠️ AI analysis failed.');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto relative">
        {/* ✅ Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* ✅ SYMPTOM LIST */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Logged Symptoms</h2>
              <button
                onClick={runAiAnalysis}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {loading ? 'Analyzing...' : 'Analyze with AI'}
              </button>
            </div>

            {aiSummary && (
              <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded mb-4 whitespace-pre-wrap">
                {aiSummary}
              </div>
            )}

            {symptomsList.length === 0 ? (
              <p className="text-gray-500">No symptoms recorded.</p>
            ) : (
              <ul className="space-y-4">
                {symptomsList.map((item) => (
                  <li key={item.id} className="bg-gray-100 p-4 rounded-md flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">{item.symptoms || 'No description'}</p>
                      <p className="text-sm text-gray-500">{item.symptomStartDate && `Started: ${item.symptomStartDate}`}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ✅ ADD SYMPTOM FORM LINK */}
          <div className="bg-white p-6 rounded-lg shadow border flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-6">Add a Symptom</h2>
            <p className="text-gray-600 mb-4">Click below to fill out a detailed symptom form.</p>
            <Link
              to="/symptomsform"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-center"
            >
              + Add Symptom
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ EDIT MODAL */}
      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow space-y-4 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold">Edit Symptom Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="symptoms" value={editForm.symptoms || ''} onChange={handleEditChange} className="border p-2 rounded-md" placeholder="Symptoms" />
              <input type="date" name="symptomStartDate" value={editForm.symptomStartDate || ''} onChange={handleEditChange} className="border p-2 rounded-md" />
              <select name="symptomProgress" value={editForm.symptomProgress || ''} onChange={handleEditChange} className="border p-2 rounded-md">
                <option value="">Symptom Progress</option>
                <option>Improving</option>
                <option>Same</option>
                <option>Worsening</option>
              </select>
              <select name="symptomConsistency" value={editForm.symptomConsistency || ''} onChange={handleEditChange} className="border p-2 rounded-md">
                <option value="">Symptom Consistency</option>
                <option>Constant</option>
                <option>Intermittent</option>
              </select>
              <label className="flex items-center gap-2"><input type="checkbox" name="fever" checked={editForm.fever || false} onChange={handleEditChange} /> Fever</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="cough" checked={editForm.cough || false} onChange={handleEditChange} /> Cough</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="fatigue" checked={editForm.fatigue || false} onChange={handleEditChange} /> Fatigue</label>
              <input name="painLevel" value={editForm.painLevel || ''} onChange={handleEditChange} placeholder="Pain Level (1–10)" className="border p-2 rounded-md" />
              <input name="painLocation" value={editForm.painLocation || ''} onChange={handleEditChange} placeholder="Pain Location" className="border p-2 rounded-md" />
              <input name="painType" value={editForm.painType || ''} onChange={handleEditChange} placeholder="Pain Type" className="border p-2 rounded-md" />
              <label className="flex items-center gap-2"><input type="checkbox" name="nausea" checked={editForm.nausea || false} onChange={handleEditChange} /> Nausea</label>
              <input name="medications" value={editForm.medications || ''} onChange={handleEditChange} placeholder="Medications" className="border p-2 rounded-md" />
              <input name="chronicConditions" value={editForm.chronicConditions || ''} onChange={handleEditChange} placeholder="Chronic Conditions" className="border p-2 rounded-md" />
              <input name="allergies" value={editForm.allergies || ''} onChange={handleEditChange} placeholder="Allergies" className="border p-2 rounded-md" />
              <input name="symptomTriggers" value={editForm.symptomTriggers || ''} onChange={handleEditChange} placeholder="Triggers" className="border p-2 rounded-md" />
              <input name="changes" value={editForm.changes || ''} onChange={handleEditChange} placeholder="Changes in Appetite/Sleep/Weight" className="border p-2 rounded-md" />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingEntry(null)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button onClick={submitEdit} className="px-4 py-2 bg-green-600 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Symptoms;
