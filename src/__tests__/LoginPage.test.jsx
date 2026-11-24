import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthProvider } from '../context/AuthContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders login form elements properly', () => {
    renderLoginPage();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByText(/Demo Test Credentials/i)).toBeInTheDocument();
  });

  it('shows error when phone does not start with +254', async () => {
    renderLoginPage();
    const input = screen.getByTestId('phone-input');
    const submitBtn = screen.getByTestId('login-button');

    fireEvent.change(input, { target: { value: '0712345678' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-error')).toHaveTextContent(
        /must start with country code/i
      );
    });
  });

  it('shows error when phone number is invalid or unauthorized', async () => {
    renderLoginPage();
    const input = screen.getByTestId('phone-input');
    const submitBtn = screen.getByTestId('login-button');

    fireEvent.change(input, { target: { value: '+254700000000' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-error')).toHaveTextContent(
        /Unauthorized number/i
      );
    });
  });

  it('autofills valid demo number when clicking demo button', () => {
    renderLoginPage();
    const autofillBtn = screen.getByTestId('autofill-demo-btn');
    fireEvent.click(autofillBtn);

    const input = screen.getByTestId('phone-input');
    expect(input.value).toBe('+254712345678');
  });

  it('successfully redirects when valid demo credentials are submitted', async () => {
    renderLoginPage();
    const autofillBtn = screen.getByTestId('autofill-demo-btn');
    fireEvent.click(autofillBtn);

    const submitBtn = screen.getByTestId('login-button');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });
});
