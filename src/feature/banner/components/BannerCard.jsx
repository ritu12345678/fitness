import React from 'react';
import Switch from '@mui/material/Switch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditNoteIcon from '@mui/icons-material/EditNote';

function BannerCard({ image, title, from, to, active, onToggle, onEdit }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="aspect-[4/3] w-full bg-gray-100">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <span>From {from}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <span>To {to}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <button onClick={onEdit} className="text-xs inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <EditNoteIcon sx={{ fontSize: 16 }} /> Edit
          </button>
          <Switch size="small" checked={!!active} onChange={(e) => onToggle?.(e.target.checked)} />
        </div>
      </div>
    </div>
  );
}

export default BannerCard;







