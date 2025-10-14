import React from 'react';
import BannerCard from './BannerCard';

function BannerGrid({ items = [], onToggle, onEdit }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((b) => (
        <BannerCard
          key={b.id}
          image={b.image}
          title={b.title}
          from={b.from}
          to={b.to}
          active={b.active}
          onToggle={(val) => onToggle?.(b.id, val)}
          onEdit={() => onEdit?.(b.id)}
        />
      ))}
    </div>
  );
}

export default BannerGrid;


