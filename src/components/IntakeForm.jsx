import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const IntakeForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
    primaryCarePhysician: '',
    smoke: false,
    alcohol: false,
    drugs: false,
    exerciseFrequency: '',
    sleepQuality: '',
    diagnoses: {
      diabetes: false,
      highBloodPressure: false,
      heartDisease: false,
      asthma: false,
      mentalHealth: false,
      other: '',
    },
    hadCovid: '',
    traveledRecently: '',
    hasInsurance: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in form.diagnoses) {
      setForm((prev) => ({
        ...prev,
        diagnoses: { ...prev.diagnoses, [name]: type === 'checkbox' ? checked : value },
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
      await addDoc(collection(db, 'intakeForms'), {
        ...form,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error submitting intake form:', err);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800">Health Intake Form</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* Basic Info */}
          <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="w-full border p-3 rounded" />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required className="w-full border p-3 rounded" />
          <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border p-3 rounded">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
          <input name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Contact Info (Phone or Email)" className="w-full border p-3 rounded" />
          <input name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact Name & Number" className="w-full border p-3 rounded" />
          <input name="primaryCarePhysician" value={form.primaryCarePhysician} onChange={handleChange} placeholder="Primary Care Physician (Optional)" className="w-full border p-3 rounded" />

          {/* Lifestyle */}
          <label className="block">Do you smoke? <input type="checkbox" name="smoke" checked={form.smoke} onChange={handleChange} /></label>
          <label className="block">Do you consume alcohol? <input type="checkbox" name="alcohol" checked={form.alcohol} onChange={handleChange} /></label>
          <label className="block">Do you use recreational drugs? <input type="checkbox" name="drugs" checked={form.drugs} onChange={handleChange} /></label>
          <input name="exerciseFrequency" value={form.exerciseFrequency} onChange={handleChange} placeholder="Exercise Frequency" className="w-full border p-3 rounded" />
          <input name="sleepQuality" value={form.sleepQuality} onChange={handleChange} placeholder="Sleep Quality" className="w-full border p-3 rounded" />

          {/* Diagnoses */}
          <div className="space-y-2">
            <label><input type="checkbox" name="diabetes" checked={form.diagnoses.diabetes} onChange={handleChange} /> Diabetes</label><br />
            <label><input type="checkbox" name="highBloodPressure" checked={form.diagnoses.highBloodPressure} onChange={handleChange} /> High Blood Pressure</label><br />
            <label><input type="checkbox" name="heartDisease" checked={form.diagnoses.heartDisease} onChange={handleChange} /> Heart Disease</label><br />
            <label><input type="checkbox" name="asthma" checked={form.diagnoses.asthma} onChange={handleChange} /> Asthma</label><br />
            <label><input type="checkbox" name="mentalHealth" checked={form.diagnoses.mentalHealth} onChange={handleChange} /> Mental Health Disorders</label><br />
            <input name="other" value={form.diagnoses.other} onChange={handleChange} placeholder="Other Diagnosis" className="w-full border p-3 rounded" />
          </div>

          {/* COVID/Travel/Insurance */}
          <select name="hadCovid" value={form.hadCovid} onChange={handleChange} required className="w-full border p-3 rounded">
            <option value="">Have you had COVID-19 in the past 3 months?</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select name="traveledRecently" value={form.traveledRecently} onChange={handleChange} required className="w-full border p-3 rounded">
            <option value="">Have you traveled recently?</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <select name="hasInsurance" value={form.hasInsurance} onChange={handleChange} required className="w-full border p-3 rounded">
            <option value="">Do you have health insurance?</option>
            <option>Yes</option>
            <option>No</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
