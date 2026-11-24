import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById, fetchUserPosts } from '../services/api';
import { DetailSkeleton } from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  FileText,
  User,
  Compass,
  ExternalLink
} from 'lucide-react';

export default function DetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, userPosts] = await Promise.all([
        fetchUserById(id),
        fetchUserPosts(id).catch(() => []), // Gracefully fallback if posts fail
      ]);
      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError(err.message || 'Unable to retrieve user details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="detail-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/" className="btn-back">
            <ArrowLeft size={16} />
            <span>Return to Directory</span>
          </Link>
        </div>
        <ErrorMessage message={error || 'User not found'} onRetry={loadData} />
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <div className="detail-container" data-testid="detail-page">
      {/* Return Button */}
      <div className="detail-nav-bar">
        <Link to="/" className="btn-back" data-testid="back-button">
          <ArrowLeft size={18} />
          <span>Back to Main Directory</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="detail-hero-card">
        <div className="detail-avatar">
          <span>{initials}</span>
        </div>
        <div className="detail-hero-info">
          <div className="detail-tags-row">
            <span className="badge-id">Member #{user.id}</span>
            <span className="badge-role">Verified Profile</span>
          </div>
          <h1 className="detail-full-name">{user.name}</h1>
          <p className="detail-username">@{user.username}</p>
          {user.company?.catchPhrase && (
            <p className="detail-catchphrase">"{user.company.catchPhrase}"</p>
          )}
        </div>
      </div>

      {/* Grid of Information Panels */}
      <div className="detail-grid-layout">
        {/* Contact Information */}
        <section className="info-panel">
          <div className="panel-header">
            <User size={18} className="panel-icon" />
            <h2>Contact Information</h2>
          </div>
          <div className="panel-body">
            <div className="info-item">
              <span className="info-label">
                <Mail size={15} /> Email
              </span>
              <a href={`mailto:${user.email}`} className="info-link">
                {user.email}
              </a>
            </div>
            <div className="info-item">
              <span className="info-label">
                <Phone size={15} /> Phone
              </span>
              <a href={`tel:${user.phone}`} className="info-link">
                {user.phone}
              </a>
            </div>
            <div className="info-item">
              <span className="info-label">
                <Globe size={15} /> Website
              </span>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer noopener"
                className="info-link external"
              >
                <span>{user.website}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </section>

        {/* Company & Organization */}
        <section className="info-panel">
          <div className="panel-header">
            <Building2 size={18} className="panel-icon" />
            <h2>Company & Team</h2>
          </div>
          <div className="panel-body">
            <div className="info-item">
              <span className="info-label">Company Name</span>
              <span className="info-text highlight">{user.company?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Industry / Sector</span>
              <span className="info-text">{user.company?.bs || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mission</span>
              <span className="info-text italic">"{user.company?.catchPhrase || 'N/A'}"</span>
            </div>
          </div>
        </section>

        {/* Address & Location */}
        <section className="info-panel full-width">
          <div className="panel-header">
            <MapPin size={18} className="panel-icon" />
            <h2>Address & Location</h2>
          </div>
          <div className="panel-body address-grid">
            <div className="info-item">
              <span className="info-label">Street Address</span>
              <span className="info-text">{user.address?.suite}, {user.address?.street}</span>
            </div>
            <div className="info-item">
              <span className="info-label">City</span>
              <span className="info-text">{user.address?.city}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Zip Code</span>
              <span className="info-text">{user.address?.zipcode}</span>
            </div>
            <div className="info-item">
              <span className="info-label">
                <Compass size={15} /> Geo Coordinates
              </span>
              <span className="info-text">
                Lat: {user.address?.geo?.lat}, Lng: {user.address?.geo?.lng}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Recent Posts / Activities */}
      {posts && posts.length > 0 && (
        <section className="posts-section">
          <div className="posts-header">
            <FileText size={18} className="panel-icon" />
            <h2>Recent Publications ({posts.length})</h2>
          </div>
          <div className="posts-list">
            {posts.slice(0, 3).map((post) => (
              <div key={post.id} className="post-card">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-body">{post.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
