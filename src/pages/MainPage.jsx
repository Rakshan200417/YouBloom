import React, { useState, useEffect, useMemo } from 'react';
import { fetchUsers } from '../services/api';
import UserCard from '../components/UserCard';
import { UserCardSkeleton } from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { Search, X, Users, RefreshCw, Filter } from 'lucide-react';

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch user directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Dynamic search filtering by name, username, email, company, and city
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return users;

    return users.filter((u) => {
      const name = (u.name || '').toLowerCase();
      const username = (u.username || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const company = (u.company?.name || '').toLowerCase();
      const city = (u.address?.city || '').toLowerCase();

      return (
        name.includes(term) ||
        username.includes(term) ||
        email.includes(term) ||
        company.includes(term) ||
        city.includes(term)
      );
    });
  }, [users, searchTerm]);

  return (
    <main className="main-page-container">
      {/* Top Banner / Hero */}
      <section className="directory-hero">
        <div className="hero-content">
          <div className="badge-pill">
            <Users size={14} />
            <span>YouBloom Member Directory</span>
          </div>
          <h1 className="hero-title">Browse Community Members</h1>
          <p className="hero-subtitle">
            Explore and connect with talented people across the network. Real-time search and profile details.
          </p>
        </div>

        {/* Dynamic Search Controls */}
        <div className="search-control-container">
          <div className="search-input-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, email, company, or city..."
              className="search-input"
              aria-label="Search members"
              data-testid="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="btn-clear-search"
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Directory Grid / States */}
      <section className="directory-content">
        <div className="directory-header-row">
          <div className="results-counter" data-testid="results-counter">
            {loading ? (
              <span>Loading team members...</span>
            ) : (
              <span>
                Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> members
                {searchTerm && ` for "${searchTerm}"`}
              </span>
            )}
          </div>
          <button
            onClick={loadUsers}
            className="btn-refresh"
            title="Refresh directory"
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'spinning' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} onRetry={loadUsers} />
        )}

        {/* Loading State: Skeletons */}
        {loading && (
          <div className="users-grid" data-testid="loading-skeletons">
            {Array.from({ length: 6 }).map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* Success State: User Cards */}
        {!loading && !error && filteredUsers.length > 0 && (
          <div className="users-grid" data-testid="users-grid">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* Empty State when filter yields 0 */}
        {!loading && !error && users.length > 0 && filteredUsers.length === 0 && (
          <div className="empty-state-box" data-testid="empty-search-state">
            <div className="empty-icon-wrap">
              <Search size={32} />
            </div>
            <h3>No matching members found</h3>
            <p>We couldn't find anyone matching "<strong>{searchTerm}</strong>". Try a different name, keyword or clear your query.</p>
            <button onClick={() => setSearchTerm('')} className="btn-secondary">
              Clear Search Filter
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
