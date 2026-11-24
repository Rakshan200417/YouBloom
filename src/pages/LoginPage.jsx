import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, ArrowRight, ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('+254');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated, VALID_DEMO_PHONE } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect to destination or home
  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = login(phoneNumber);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error);
      setIsSubmitting(false);
    }
  };

  const handleUseDemo = () => {
    setPhoneNumber(VALID_DEMO_PHONE);
    setErrorMessage('');
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-header">
          <div className="brand-logo-large">
            <span className="brand-dot-large"></span>
            <span className="brand-text-large">you<span className="brand-highlight">bloom</span></span>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to access the talent and team directory</p>
        </div>

        {errorMessage && (
          <div className="login-error-alert" role="alert" data-testid="login-error">
            <AlertCircle size={18} className="error-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="phone-input" className="form-label">
              Phone Number
            </label>
            <div className="input-field-wrapper">
              <span className="input-icon-box">
                <Phone size={18} />
              </span>
              <input
                id="phone-input"
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="+254712345678"
                className={`form-input ${errorMessage ? 'input-error' : ''}`}
                autoComplete="tel"
                data-testid="phone-input"
              />
            </div>
            <p className="field-hint">Must start with country code (e.g. +254)</p>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
            data-testid="login-button"
          >
            <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="demo-credentials-box">
          <div className="demo-header">
            <Sparkles size={16} className="sparkle-icon" />
            <span>Demo Test Credentials</span>
          </div>
          <div className="demo-body">
            <p>Valid mock number: <strong className="demo-phone">{VALID_DEMO_PHONE}</strong></p>
            <button
              type="button"
              onClick={handleUseDemo}
              className="btn-autofill"
              data-testid="autofill-demo-btn"
            >
              Fill Demo Number
            </button>
          </div>
        </div>

        <div className="login-footer">
          <ShieldCheck size={16} />
          <span>Secure Mock Authentication for YouBloom Technical Assessment</span>
        </div>
      </div>
    </div>
  );
}
