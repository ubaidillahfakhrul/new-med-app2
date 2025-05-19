import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    onLogout(); // logout function from parent
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        onClick={handleToggle}
        style={{ cursor: 'pointer', fontWeight: '500' }}
      >
        Welcome, {user?.name || 'User'}
      </span>

      {dropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            padding: '10px',
            zIndex: 1000,
          }}
        >
          <div
            style={{ padding: '8px', cursor: 'pointer' }}
            onClick={() => navigate('/profile')}
          >
            Your Profile
          </div>
          <div
            style={{ padding: '8px', cursor: 'pointer' }}
            onClick={() => navigate('/reports')}
          >
            Your Reports
          </div>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginLeft: '10px',
          padding: '5px 12px',
          borderRadius: '20px',
          border: '1px solid #007bff',
          background: 'white',
          color: '#007bff',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
