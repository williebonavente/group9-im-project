import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <button onClick={handleLogout} className="py-2 px-4 bg-primary text-white rounded hover:bg-primaryHover">
      Logout
    </button>
  );
};

export default LogoutButton;
