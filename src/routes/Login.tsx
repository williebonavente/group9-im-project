import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.js';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Logging in with:', { username, password });
            await loginUser({ email: username, password });
            navigate('/'); // Adjust the route according to your application
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'system'; // Adjust default theme as needed
        applyTheme(theme);
    }, []);

    const applyTheme = (selectedTheme: string) => {
        const isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(selectedTheme);

        if (selectedTheme === 'system') {
            document.documentElement.classList.toggle('dark', isDarkModePreferred);
            document.documentElement.classList.toggle('light', !isDarkModePreferred);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base">
            <div className="login-register-container max-w-md w-full bg-white p-8 border border-container rounded shadow-md">
                {/* Welcoming message */}
                <h2 className="text-3xl text-center text-primary font-bold mb-4">Welcome to Taskwrite</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-field-wrapper mb-4">
                        <label className="block text-main text-sm font-bold mb-2">Username:</label>
                        <input
                            required
                            type="text"
                            name="username"
                            placeholder="Enter username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
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
                            className="w-full px-3 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
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

                {/* Zoom effect on hover */}
                <p className="mt-4 text-center text-main">
                    Don't have an account?{' '}
                    <a href="/register" className="text-primary hover:underline transform transition duration-300 hover:scale-110">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
