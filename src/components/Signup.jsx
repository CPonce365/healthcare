import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    document.body.style.backgroundImage = "url('/images/binary_rain.png')";
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Signup successful!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-bold text-[#20B486] text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="E-mail address"
            className="w-full px-4 py-3 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-md"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-md"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="w-full bg-[#20B486] text-white py-3 rounded-md font-semibold">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account? <a href="/login" className="text-[#20B486]">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
