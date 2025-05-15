import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const DietForm = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        foodName:'',
        date:'',
        time:'',
        mealType:'',
        items:'',
        calories:'',
        carbs:'',
        protein:'',
        fat:'',
        hungerLevel:null,
        goals:'',
        notes:'',
        status:'Pending',
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleHungerClick = (level) => {
        setForm((prev) => ({ ...prev, hungerLevel: level }));
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
            console.error('Failed to save diet:', err);
            alert('Failed to save diet. Please try again.');
        }
    };

    return(
        <div className="min-h-screen bg-white py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800">Diet Form</h1>
                <p className="text-center text-gray-500 mt-2 mb-8">Please fill out the information to the best of your ability!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium"> Food Name</label>
                        <input type="text" name="foodName" value={form.foodName} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block font-medium"> Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Time</label>
                            <input type="time" name="time" value={form.time} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block font-medium"> Meal Type</label>
                            <input type="text" name="mealType" value={form.mealType} onChange={handleChange} placeholder="e.g. Breakfast, Lunch, Dinner" required  className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Food Items</label>
                            <input type="text" name="items" value={form.items} onChange={handleChange} placeholder="e.g. 3, 7, 11" required className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block font-medium mb-3">Hunger Level (1–5)</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((level) => (
                                <button type="button" key={level} onClick={() => handleHungerClick(level)} className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border ${ form.hungerLevel === level ? 'bg-blue-600 text-white border-blue-600': 'bg-white text-gray-800 border-gray-300'}`}>
                                    <span className="font-bold">{level}</span>
                                    </button>
                                ))}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className="flex-1">
                            <label className="block font-medium"> Calories</label>
                            <input type="number" name="calories" value={form.calories} onChange={handleChange} required min={0} placeholder="e.g. 200" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Carbs</label>
                            <input type="number" name="carbs" value={form.carbs} onChange={handleChange} required min={0} placeholder="e.g. 50g" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className="flex-1">
                            <label className="block font-medium"> Protein</label>
                            <input type="number" name="protein" value={form.protein} onChange={handleChange} required min={0} placeholder="e.g. 20g" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium"> Fat</label>
                            <input type="number" name="fat" value={form.fat} onChange={handleChange} required min={0} placeholder="e.g. 10g" className="w-full mt-1 px-4 py-3 border rounded-md" />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium"> Goals</label>
                        <input type="text" name="goals" value={form.goals} onChange={handleChange} placeholder="e.g. Weight Loss, Muscle Gain" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>

                    <div>
                        <label className="block font-medium"> Notes</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional information" className="w-full mt-1 px-4 py-3 border rounded-md" />
                    </div>
                    <button type="submit" className="w-full bg-[#20B486] text-white py-2 rounded-md hover:bg-[#17a074] transition duration-200">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default DietForm;