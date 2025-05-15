import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Medications = () => {
    const [entries, setEntries] = useState([]);
      const [editingEntry, setEditingEntry] = useState(null);
      const [editForm, setEditForm] = useState({});
      const [user, setUser] = useState(null);
      const navigate = useNavigate();
    
      useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (!currentUser) {
            navigate("/login");
          } else {
            setUser(currentUser);
            fetchEntries(currentUser.uid);
          }
        });
    
        return () => unsubscribe();
      }, [navigate]);
    
      const fetchEntries = async (uid) => {
        const q = query(collection(db, "intakeForms"), where("userId", "==", uid));
        try {
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setEntries(data);
        } catch (err) {
          console.error("Failed to fetch entries:", err);
        }
      };
    
      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
          try {
            await deleteDoc(doc(db, "intakeForms", id));
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
          } catch (error) {
            console.error("Error deleting document:", error);
          }
        }
      };
    
      const handleLogout = async () => {
        const auth = getAuth();
        try {
          await signOut(auth);
          navigate("/login");
        } catch (err) {
          console.error("Logout failed:", err);
        }
      };
    
      const openEditModal = (entry) => {
        setEditingEntry(entry);
        setEditForm({ ...entry });
      };
    
      const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const submitEdit = async () => {
        try {
          await updateDoc(doc(db, "intakeForms", editingEntry.id), editForm);
          setEditingEntry(null);
          fetchEntries(user.uid);
        } catch (err) {
          console.error("Failed to update entry:", err);
        }
      };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-6 py-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Medications</h2>
          <p className="text-gray-500"> No recent activity</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold mb-4">Medication History</h2>
            <Link
              to="/medForm"
              className="text-[#20B486] font-medium hover:underline text-sm"
            >
              + Add Entry
            </Link>
          </div>
          
          {entries.length === 0 ? ( <p className="text-gray-500">No entries yet.</p> ) : (
              <ul className="space-y-2">
                {entries.map((entry) => (
                    <li key={entry.id} className="p-3 bg-[#f0fdf4] rounded-md border flex justify-between items-start">
                        <div> 
                            <h3 className="text-md font-bold">{entry.medicationName}</h3>
                            <p className="text-sm text-gray-700">{entry.notes || "No notes provided."}</p>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => openEditModal(entry)} className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">Edit</button>
                            <button onClick={() => handleDelete(entry.id)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Delete</button>
                      </div>
                  </li>
                ))}
            </ul>
        )}
        </div>
      </div>
      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg space-y-4">
                <h3 className="text-lg font-bold mb-4">Edit Medication Form</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="medicationName"value={editForm.medicationName || ""} onChange={handleEditChange} className="border p-2 rounded-md" placeholder="Medication Name"/>
                    <div>
                        <label className="block font-medium"> Dosage</label>
                        <input type="text" name="dosage" value={editForm.dosage} onChange={handleEditChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
                    
                    <div>
                        <label className="block font-medium"> Frequency</label>
                        <input type="text" name="frequency" value={editForm.frequency} onChange={handleEditChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
            
                    <div>
                        <label className="block font-medium"> Start Date</label>
                        <input type="date" name="startDate" value={editForm.startDate} onChange={handleEditChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
            
                    <div>
                        <label className="block font-medium"> End Date</label>
                        <input type="date" name="endDate" value={editForm.endDate} onChange={handleEditChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div>
                        <label className="block font-medium"> Side Effects</label>
                        <input type="text" name="sideEffects" value={editForm.sideEffects} onChange={handleEditChange} placeholder="e.g., Headaches, Dizziness, Stomach Pain" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div>
                        <label className="block font-medium"> Indication</label>
                        <input type="text" name="indication" value={editForm.indication} onChange={handleEditChange} placeholder="e.g., Pain Relief, Infection" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div>
                        <label className="block font-medium"> Allergies</label>
                        <input type="text" name="allergies" value={editForm.allergies} onChange={handleEditChange} placeholder="e.g., Penicillin, Sulfa Drugs" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
            
                    <div>
                        <label className="block font-medium"> Side Notes</label>
                        <textarea name="notes" value={editForm.notes} onChange={handleEditChange} placeholder="Any additional information" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>  
            
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditingEntry(null)} className="px-4 py-2 border rounded-md text-gray-700">Cancel</button>
                    <button onClick={submitEdit} className="px-4 py-2 bg-green-600 text-white rounded-md">Save</button>
                </div>
            </div>
      </div>
      )}
    </div>
  );
};

export default Medications;
