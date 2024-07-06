import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      navigate('/home'); // Adjust the route according to your application
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="login-register-container max-w-md w-full bg-white p-8 border border-container rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2">Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2">Password:</label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper">
            <input
              type="submit"
              value="Login"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primaryHover cursor-pointer"
            />
          </div>
        </form>

        <p className="mt-4 text-center text-main">
          Don't have an account? <a href="/register" className="text-primary hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
