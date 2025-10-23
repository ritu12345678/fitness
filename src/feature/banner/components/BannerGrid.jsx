import React from 'react';
import BannerCard from './BannerCard';

function BannerGrid({ items = [], onToggle, onEdit, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No banners found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((b) => (
        <BannerCard
          key={b._id || b.id}
          image={b?.feature_image}
          title={b?.title}
          from={b?.from}
          to={b?.to}
          active={b.status}
          banner={b}
          onToggle={(val) => onToggle?.(b._id || b.id, val)}
          onEdit={(banner) => onEdit?.(banner)}
        />
      ))}
    </div>
  );
}

export default BannerGrid;










