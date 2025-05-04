import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../components/FormContext';

const IntakeForm = () => {
  const { addEntry } = useFormData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    temperature: '',
    symptoms: '',
    symptomStartDate: '',
    symptomsWorsening: false,
    chronicConditions: '',
    medications: '',
    allergies: '',
    painLevel: null,
    status: 'Pending', // default for admin/dashboard updates
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePainClick = (level) => {
    setForm((prev) => ({ ...prev, painLevel: level }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry(form);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800">Health Intake Form</h1>
        <p className="text-center text-gray-500 mt-2 mb-8">Let us know how we can help you!</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name, Email/Phone */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-medium">First Name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Last Name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block font-medium">Email or Phone</label>
            <input type="text" name="emailOrPhone" value={form.emailOrPhone} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          {/* DOB & Gender */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-medium">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md">
                <option value="">Select...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Vitals */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block font-medium">Height (inches)</label>
              <input type="number" name="height" value={form.height} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Weight (lbs)</label>
              <input type="number" name="weight" value={form.weight} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
            <div className="flex-1">
              <label className="block font-medium">Temperature (°F)</label>
              <input type="number" name="temperature" value={form.temperature} onChange={handleChange} className="w-full mt-1 px-4 py-3 border rounded-md" />
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block font-medium">Describe your symptoms</label>
            <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={4} required className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          {/* Symptom Start Date */}
          <div>
            <label className="block font-medium">When did symptoms start?</label>
            <input type="date" name="symptomStartDate" value={form.symptomStartDate} onChange={handleChange} required className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          {/* Worsening */}
          <div>
            <label className="block font-medium mb-2">Are symptoms worsening?</label>
            <input type="checkbox" name="symptomsWorsening" checked={form.symptomsWorsening} onChange={handleChange} />
            <span className="ml-2 text-gray-700">Yes</span>
          </div>

          {/* History */}
          <div>
            <label className="block font-medium">Chronic Conditions</label>
            <input type="text" name="chronicConditions" value={form.chronicConditions} onChange={handleChange} placeholder="e.g., Diabetes, Asthma" className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          <div>
            <label className="block font-medium">Current Medications</label>
            <input type="text" name="medications" value={form.medications} onChange={handleChange} className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          <div>
            <label className="block font-medium">Allergies</label>
            <input type="text" name="allergies" value={form.allergies} onChange={handleChange} className="w-full mt-1 px-4 py-3 border rounded-md" />
          </div>

          {/* Pain Level */}
          <div>
            <label className="block font-medium mb-3">Pain Level (1–5)</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => handlePainClick(level)}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border ${
                    form.painLevel === level
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  <span className="font-bold">{level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold text-lg transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
