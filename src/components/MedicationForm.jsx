import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const MedicationForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        medicationName: '',
        dosage:'',
        frequency:'',
        startDate:'',
        endDate:'',
        sideEffects:'',
        indication:'',
        allergies:'',
        notes:'',
        status:'Pending',
});

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        alert('You must be logged in to submit the form.');
        return;
    }

    try{
        await addDoc(collection(db, 'intakeForms'), {
            ...form, 
            userId: user.uid,
            timestamp: serverTimestamp(),
        });

        navigate('/dashboard');
    } catch (err) {
        console.error('Failed to save medication:', err);
    }
};

return(
<div className="min-h-screen bg-white py-12 px-6">
    <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800">Medication Form</h1>
        <p className="text-center text-gray-500 mt-2 mb-8">Please fill out the information to the best of your ability!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block font-medium"> Medication Name</label>
                <input type="text" name="medicationName" value={form.medicationName} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <label className="block font-medium"> Dosage</label>
                    <input type="text" name="dosage" value={form.dosage} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                </div>
                <div className="flex-1">
                    <label className="block font-medium"> Frequency</label>
                    <input type="text" name="frequency" value={form.frequency} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">

                <div className="flex-1">
                    <label className="block font-medium"> Start Date</label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                </div>

                <div className="flex-1">
                    <label className="block font-medium"> End Date</label>
                    <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                </div>

            </div>

            <div>
                <label className="block font-medium"> Side Effects</label>
                <input type="text" name="sideEffects" value={form.sideEffects} onChange={handleChange} placeholder="e.g., Headaches, Dizziness, Stomach Pain" className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>

            <div>
                <label className="block font-medium"> Indication</label>
                <input type="text" name="indication" value={form.indication} onChange={handleChange} placeholder="e.g., Pain Relief, Infection" className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>

            <div>
                <label className="block font-medium"> Allergies</label>
                <input type="text" name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g., Penicillin, Sulfa Drugs" className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>

            <div>
                <label className="block font-medium"> Side Notes</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional information" className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>

            <div className="pt-4">
                <button type="submit" className="w-full bg-[#20B486] text-white font-semibold py-3 px-4 rounded-md hover:bg-[#1a8f6b] transition duration-200">Submit</button>
            </div>
        </form>
    </div>
</div>
);

}
export default MedicationForm;