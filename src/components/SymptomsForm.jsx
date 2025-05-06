import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const SymptomForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    symptoms: '',
    symptomStartDate: '',
    symptomProgression: '',
    symptomFrequency: '',
    feverOrChills: false,
    coughOrBreath: false,
    fatigueOrAches: false,
    painLevel: '',
    painLocation: '',
    painType: {
      sharp: false,
      dull: false,
      burning: false,
      throbbing: false,
      pressure: false,
    },
    nauseaVomitingDiarrhea: false,
    medications: '',
    chronicConditions: '',
    allergies: '',
    symptomTriggers: '',
    changesInAppetiteSleep: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in form.painType) {
      setForm((prev) => ({
        ...prev,
        painType: { ...prev.painType, [name]: checked },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return alert('Not signed in');

    try {
        await addDoc(collection(db, 'symptomEntries'), {
            ...form, 
            userId: user.uid,
            timestamp: serverTimestamp(),
          });
          
          
        navigate('/symptoms');

      } catch (err) {
        console.error('Error submitting symptom form:', err);
      }
      
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Symptom Form</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            placeholder="What symptoms are you currently experiencing?"
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="date"
            name="symptomStartDate"
            value={form.symptomStartDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />
          <select
            name="symptomProgression"
            value={form.symptomProgression}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Are your symptoms improving, same, or worsening?</option>
            <option value="Improving">Improving</option>
            <option value="Same">Same</option>
            <option value="Worsening">Worsening</option>
          </select>
          <select
            name="symptomFrequency"
            value={form.symptomFrequency}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Are your symptoms constant or intermittent?</option>
            <option value="Constant">Constant</option>
            <option value="Intermittent">Intermittent</option>
          </select>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="feverOrChills" checked={form.feverOrChills} onChange={handleChange} />
            Do you have a fever or chills?
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="coughOrBreath" checked={form.coughOrBreath} onChange={handleChange} />
            Do you have a cough or shortness of breath?
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="fatigueOrAches" checked={form.fatigueOrAches} onChange={handleChange} />
            Are you experiencing fatigue or body aches?
          </label>
          <div>
            <input
              name="painLevel"
              value={form.painLevel}
              onChange={handleChange}
              placeholder="Pain Level (1–10)"
              className="w-full border p-3 rounded mb-2"
            />
            <input
              name="painLocation"
              value={form.painLocation}
              onChange={handleChange}
              placeholder="Pain Location"
              className="w-full border p-3 rounded"
            />
          </div>
          <fieldset className="col-span-2">
            <legend className="font-semibold mb-2">Pain Type</legend>
            <div className="flex flex-wrap gap-4">
              {['sharp', 'dull', 'burning', 'throbbing', 'pressure'].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input type="checkbox" name={type} checked={form.painType[type]} onChange={handleChange} />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="nauseaVomitingDiarrhea" checked={form.nauseaVomitingDiarrhea} onChange={handleChange} />
            Have you experienced nausea, vomiting, or diarrhea?
          </label>
          <input
            name="medications"
            value={form.medications}
            onChange={handleChange}
            placeholder="Current Medications"
            className="w-full border p-3 rounded"
          />
          <input
            name="chronicConditions"
            value={form.chronicConditions}
            onChange={handleChange}
            placeholder="Chronic Conditions"
            className="w-full border p-3 rounded"
          />
          <input
            name="allergies"
            value={form.allergies}
            onChange={handleChange}
            placeholder="Known Allergies"
            className="w-full border p-3 rounded"
          />
          <input
            name="symptomTriggers"
            value={form.symptomTriggers}
            onChange={handleChange}
            placeholder="What makes your symptoms worse?"
            className="w-full border p-3 rounded"
          />
          <input
            name="changesInAppetiteSleep"
            value={form.changesInAppetiteSleep}
            onChange={handleChange}
            placeholder="Changes in appetite, weight, or sleep"
            className="w-full border p-3 rounded"
          />
          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Submit Symptom Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default SymptomForm;
