import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <AlertTriangle size={48} className="not-found-icon" />
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-primary">
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
