import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <span className="brand-dot"></span>
            <span className="brand-text">you<span className="brand-highlight">bloom</span></span>
          </div>
          <span className="brand-badge">Directory</span>
        </Link>

        {isAuthenticated && user && (
          <div className="navbar-actions">
            <div className="user-profile-pill">
              <User size={15} className="user-icon" />
              <span className="user-phone">{user.phoneNumber}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-logout"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
