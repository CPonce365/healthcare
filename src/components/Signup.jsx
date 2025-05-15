import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-4xl font-bold text-[#20B486] mb-3">Create your account</h1>
        <p className="text-lg text-gray-600 mb-8">Start your journey with smarter health tracking.</p>

        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full mt-2 px-5 py-4 border text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-[#20B486]"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-5 py-4 border text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-[#20B486]"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-2 px-5 py-4 border text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-[#20B486]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg bg-[#20B486] text-white rounded-md font-semibold hover:bg-[#199d73] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-md text-gray-600 mt-8 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-[#20B486] font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
