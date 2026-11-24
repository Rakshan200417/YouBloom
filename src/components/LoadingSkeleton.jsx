import React from 'react';

export function UserCardSkeleton() {
  return (
    <div className="user-card skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar skeleton-shimmer"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line title skeleton-shimmer"></div>
          <div className="skeleton-line subtitle skeleton-shimmer"></div>
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line field skeleton-shimmer"></div>
        <div className="skeleton-line field skeleton-shimmer"></div>
        <div className="skeleton-line field short skeleton-shimmer"></div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-line button skeleton-shimmer"></div>
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="detail-skeleton-wrapper">
      <div className="skeleton-line back-btn skeleton-shimmer"></div>
      <div className="detail-hero skeleton-card">
        <div className="skeleton-avatar large skeleton-shimmer"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line big-title skeleton-shimmer"></div>
          <div className="skeleton-line subtitle skeleton-shimmer"></div>
        </div>
      </div>
      <div className="detail-grid">
        <div className="skeleton-card skeleton-info-box">
          <div className="skeleton-line title skeleton-shimmer"></div>
          <div className="skeleton-line field skeleton-shimmer"></div>
          <div className="skeleton-line field skeleton-shimmer"></div>
        </div>
        <div className="skeleton-card skeleton-info-box">
          <div className="skeleton-line title skeleton-shimmer"></div>
          <div className="skeleton-line field skeleton-shimmer"></div>
          <div className="skeleton-line field skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}
