import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Symptoms = () => {
  const [symptomsList, setSymptomsList] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchSymptoms();
  }, [user]);

  const fetchSymptoms = async () => {
    const q = query(collection(db, 'symptomEntries'), where('userId', '==', user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-semibold mb-4">Logged Symptoms</h2>
          {symptomsList.length === 0 ? (
            <p className="text-gray-500">No symptoms recorded.</p>
          ) : (
            <ul className="space-y-4">
              {symptomsList.map((item) => (
                <li key={item.id} className="bg-gray-100 p-4 rounded-md flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 font-semibold">{item.symptoms || 'No description'}</p>
                    <p className="text-sm text-gray-500"></p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mb-6">Add a Symptom</h2>
          <p className="text-gray-600 mb-4">Click below to fill out a detailed symptom form.</p>
          <Link
            to="/symptomsform"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-block text-center"
          >
            + Add Symptom
          </Link>
        </div>
      </div>

      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow space-y-4 overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-bold">Edit Symptom Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="symptoms" value={editForm.symptoms || ''} onChange={handleEditChange} className="border p-2 rounded-md" placeholder="What symptoms are you currently experiencing?" />
              <input type="date" name="symptomStartDate" value={editForm.symptomStartDate || ''} onChange={handleEditChange} className="border p-2 rounded-md" />
              <select name="symptomProgress" value={editForm.symptomProgress || ''} onChange={handleEditChange} className="border p-2 rounded-md">
                <option value="">Are your symptoms...</option>
                <option>Improving</option>
                <option>Same</option>
                <option>Worsening</option>
              </select>
              <select name="symptomConsistency" value={editForm.symptomConsistency || ''} onChange={handleEditChange} className="border p-2 rounded-md">
                <option value="">Are they...</option>
                <option>Constant</option>
                <option>Intermittent</option>
              </select>
              <label><input type="checkbox" name="fever" checked={editForm.fever || false} onChange={handleEditChange} /> Fever or chills</label>
              <label><input type="checkbox" name="cough" checked={editForm.cough || false} onChange={handleEditChange} /> Cough or shortness of breath</label>
              <label><input type="checkbox" name="fatigue" checked={editForm.fatigue || false} onChange={handleEditChange} /> Fatigue or body aches</label>
              <input name="painLevel" value={editForm.painLevel || ''} onChange={handleEditChange} placeholder="Pain (1–10)" className="border p-2 rounded-md" />
              <input name="painLocation" value={editForm.painLocation || ''} onChange={handleEditChange} placeholder="Pain location" className="border p-2 rounded-md" />
              <input name="painType" value={editForm.painType || ''} onChange={handleEditChange} placeholder="Pain type (sharp, dull, etc.)" className="border p-2 rounded-md" />
              <label><input type="checkbox" name="nausea" checked={editForm.nausea || false} onChange={handleEditChange} /> Nausea, vomiting, or diarrhea</label>
              <input name="medications" value={editForm.medications || ''} onChange={handleEditChange} placeholder="Medications" className="border p-2 rounded-md" />
              <input name="chronicConditions" value={editForm.chronicConditions || ''} onChange={handleEditChange} placeholder="Chronic conditions" className="border p-2 rounded-md" />
              <input name="allergies" value={editForm.allergies || ''} onChange={handleEditChange} placeholder="Known allergies" className="border p-2 rounded-md" />
              <input name="symptomTriggers" value={editForm.symptomTriggers || ''} onChange={handleEditChange} placeholder="What worsens symptoms?" className="border p-2 rounded-md" />
              <input name="changes" value={editForm.changes || ''} onChange={handleEditChange} placeholder="Changes in appetite, weight, or sleep?" className="border p-2 rounded-md" />
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