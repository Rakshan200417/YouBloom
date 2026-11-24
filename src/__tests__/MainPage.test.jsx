import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import * as api from '../services/api';

vi.mock('../services/api');

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031',
    address: { city: 'Gwenborough', street: 'Kulas Light', suite: 'Apt. 556', zipcode: '92998-3874' },
    company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593',
    address: { city: 'Wisokyburgh', street: 'Victor Plains', suite: 'Suite 879', zipcode: '90566-7771' },
    company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency' },
  },
];

describe('MainPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user cards once API data is fetched', async () => {
    api.fetchUsers.mockResolvedValueOnce(mockUsers);

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    });

    expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 2 of 2 members/i);
  });

  it('filters users dynamically when typing in search input', async () => {
    api.fetchUsers.mockResolvedValueOnce(mockUsers);

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Ervin' } });

    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    expect(screen.getByTestId('results-counter')).toHaveTextContent(/Showing 1 of 2 members/i);
  });

  it('shows empty state when search term has no match', async () => {
    api.fetchUsers.mockResolvedValueOnce(mockUsers);

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'NonExistentNameXYZ' } });

    expect(screen.getByTestId('empty-search-state')).toBeInTheDocument();
    expect(screen.getByText(/No matching members found/i)).toBeInTheDocument();
  });

  it('shows error banner when API call fails', async () => {
    api.fetchUsers.mockRejectedValueOnce(new Error('Network error: Failed to fetch'));

    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Network error: Failed to fetch/i)).toBeInTheDocument();
    });
  });
});
