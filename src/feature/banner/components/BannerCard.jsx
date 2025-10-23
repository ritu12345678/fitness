import React from 'react';
import Switch from '@mui/material/Switch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ImageIcon from '@mui/icons-material/Image';
import { formatDate, isValidImageUrl, getDefaultImage } from '../../../constants';

function BannerCard({ image, title, from, to, active, onToggle, onEdit, banner }) {
  // Get default banner image
  const defaultImage = getDefaultImage('banner');
  
  // Check if image is valid
  const hasValidImage = isValidImageUrl(image);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="aspect-[4/3] w-full bg-gray-100">
        {hasValidImage ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show default image
              e.target.src = defaultImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <ImageIcon sx={{ fontSize: 48, color: '#9CA3AF', marginBottom: 1 }} />
              <p className="text-sm text-gray-500 font-medium">No Image</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <span>From {formatDate(from)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarMonthIcon sx={{ fontSize: 16, color: '#64748b' }} />
            <span>To {formatDate(to)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <button onClick={() => onEdit?.(banner)} className="text-xs inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <EditNoteIcon sx={{ fontSize: 16 }} /> Edit
          </button>
          <Switch 
            size="small" 
            checked={!!active} 
            onChange={(e) => onToggle?.(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default BannerCard;










