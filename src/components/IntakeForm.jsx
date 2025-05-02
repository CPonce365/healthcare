import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '../components/FormContext';

const IntakeForm = () => {
  const { addEntry } = useFormData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    height: '',
    weight: '',
    symptoms: '',
    painLevel: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
          {/* Full Name */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-md font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g., Jane"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-md font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="e.g., Doe"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border rounded-md"
              />
            </div>
          </div>

          {/* Height and Weight */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-md font-medium text-gray-700">Height (inches)</label>
              <input
                type="number"
                name="height"
                placeholder="e.g., 65"
                value={form.height}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block text-md font-medium text-gray-700">Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                placeholder="e.g., 150"
                value={form.weight}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-3 border rounded-md"
              />
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              Can you describe the symptoms that you are experiencing?
            </label>
            <textarea
              name="symptoms"
              placeholder="Type here..."
              value={form.symptoms}
              onChange={handleChange}
              required
              rows={5}
              className="w-full mt-1 px-4 py-3 border rounded-md"
            />
          </div>

          {/* Pain Level */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-3">
              Describe your pain from 1–5 (1 being lowest, 5 being highest)
            </label>
            <div className="flex justify-between max-w-md gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => handlePainClick(level)}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border ${
                    form.painLevel === level
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-800 border-gray-300'
                  } transition`}
                >
                  <span className="font-bold">{level}</span>
                  <span className="text-xs">
                    {level === 1 ? 'Worst' : level === 5 ? 'Best' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold text-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
