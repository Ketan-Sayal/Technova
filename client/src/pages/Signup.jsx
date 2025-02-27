import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-[#1c1c24] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-6">Sign Up</h2>
        {error && <div className="bg-red-500 p-3 rounded mb-4 text-white">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#808191] mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-md bg-[#3a3a43] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#808191] mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-md bg-[#3a3a43] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#808191] mb-2" htmlFor="password-confirm">Confirm Password</label>
            <input
              type="password"
              id="password-confirm"
              className="w-full px-4 py-3 rounded-md bg-[#3a3a43] text-white"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8c6dfd] text-white py-3 px-4 rounded-md hover:bg-[#7c5ffd] disabled:opacity-70"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-[#808191]">
          Already have an account? <a href="/login" className="text-[#8c6dfd]">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;