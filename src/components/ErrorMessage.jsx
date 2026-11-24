import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <div className="error-icon-box">
        <AlertCircle size={24} className="error-icon" />
      </div>
      <div className="error-content">
        <h4 className="error-title">Something went wrong</h4>
        <p className="error-text">{message || 'An unexpected error occurred while loading data.'}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-retry">
            <RefreshCw size={15} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}
