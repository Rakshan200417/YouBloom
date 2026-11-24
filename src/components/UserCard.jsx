import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Building2, MapPin, ChevronRight } from 'lucide-react';

export default function UserCard({ user }) {
  // Generate consistent initials and gradient avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(user.name);

  return (
    <article className="user-card" data-testid={`user-card-${user.id}`}>
      <div className="card-top">
        <div className="avatar-circle">
          <span>{initials}</span>
        </div>
        <div className="user-primary-info">
          <h3 className="user-name">{user.name}</h3>
          <span className="user-username">@{user.username}</span>
        </div>
      </div>

      <div className="card-company-tag">
        <Building2 size={14} className="tag-icon" />
        <span className="company-name">{user.company?.name || 'Independent'}</span>
      </div>

      <div className="card-details-list">
        <div className="detail-row">
          <Mail size={14} className="detail-icon" />
          <span className="detail-value text-truncate">{user.email}</span>
        </div>
        <div className="detail-row">
          <Phone size={14} className="detail-icon" />
          <span className="detail-value">{user.phone}</span>
        </div>
        <div className="detail-row">
          <MapPin size={14} className="detail-icon" />
          <span className="detail-value">{user.address?.city || 'Location N/A'}</span>
        </div>
      </div>

      <div className="card-footer">
        <Link to={`/users/${user.id}`} className="view-profile-link">
          <span>View Details</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}
