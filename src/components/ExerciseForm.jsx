import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ExerciseForm = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        exerciseType: '',
        duration: '',
        frequency:'',
        intensity: '',
        date: '',
        startTime: '',
        endTime: '',
        heartRate: '',
        caloriesBurned: '',
        equipmentUsed: '',
        notes: '',
        status: 'Pending',
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
            console.error('Failed to save exercise:', err);
            alert('Failed to save exercise. Please try again.');
        }
    };

    return(
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800">Exercise Form</h1>
                <p className="text-center text-gray-500 mt-2 mb-8">Please fill out the information to the best of your ability!</p>
        
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium"> Exercise Type</label>
                        <input type="text" name="exerciseType" value={form.exerciseType} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block font-medium"> Duration</label>
                            <input type="number" name="duration" value={form.duration} onChange={handleChange} required min={0} placeholder="e.g. 45 min" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Frequency</label>
                            <input type="text" name="frequency" value={form.frequency} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
        
                        <div className="flex-1">
                            <label className="block font-medium"> Intensity</label>
                            <input type="text" name="intensity" value={form.intensity} onChange={handleChange} required placeholder="e.g. Light, Moderate, Intense" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
        
                        <div className="flex-1">
                            <label className="block font-medium"> Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
        
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block font-medium"> Start Time</label>
                            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        
                        <div className="flex-1">
                            <label className="block font-medium"> End Time</label>
                            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block font-medium"> Heart Rate</label>
                            <input type="number" name="heartRate" value={form.heartRate} onChange={handleChange} required min={0} placeholder="e.g. 120 bpm" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Calories Burned</label>
                            <input type="number" name="caloriesBurned" value={form.caloriesBurned} onChange={handleChange} required min={0} placeholder="e.g. 300 kcal" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium"> Equipment Used</label>
                        <input type="text" name="equipmentUsed" value={form.equipmentUsed} onChange={handleChange} placeholder="e.g. Treadmill, Dumbbells" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div>
                        <label className="block font-medium"> Side Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional information" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
        
                    <div className="pt-4">
                        <button type="submit" className="w-full bg-red-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-[#1a8f6b] transition duration-200">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
        );
}

export default ExerciseForm;