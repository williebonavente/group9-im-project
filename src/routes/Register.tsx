import React, { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Register: React.FC = () => {
  const registerForm = useRef<HTMLFormElement | null>(null);
  const { registerUser } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!registerForm.current) return;

    const name = (registerForm.current.elements.namedItem('name') as HTMLInputElement).value;
    const email = (registerForm.current.elements.namedItem('email') as HTMLInputElement).value;
    const password1 = (registerForm.current.elements.namedItem('password1') as HTMLInputElement).value;
    const password2 = (registerForm.current.elements.namedItem('password2') as HTMLInputElement).value;

    if (password1 !== password2) {
      alert('Passwords did not match!');
      return;
    }

    const userInfo = { name, email, password: password1, password1, password2 };
    registerUser(userInfo); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="login-register-container max-w-md w-full bg-white p-8 border border-container rounded shadow-md">
        <form ref={registerForm} onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center text-primary font-bold mb-4">Register</h2>
        <br></br>
          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2" title="Enter your name">Name:</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter name..."
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2" title="Enter your email">Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email..."
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2" title="Enter your password">Password:</label>
            <input
              required
              type="password"
              name="password1"
              placeholder="Enter password..."
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper mb-4">
            <label className="block text-main text-sm font-bold mb-2" title="Confirm your password">Confirm Password:</label>
            <input
              required
              type="password"
              name="password2"
              placeholder="Confirm password..."
              className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-field-wrapper">
            <input
              type="submit"
              value="Submit"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primaryHover cursor-pointer"
            />
          </div>
        </form>

        <p className="mt-4 text-center text-main">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
