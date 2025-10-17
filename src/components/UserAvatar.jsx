import React from 'react';
import Avatar from '@mui/material/Avatar';

function getInitial(name) {
  if (!name || typeof name !== 'string') return '?';
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed.charAt(0).toUpperCase() : '?';
}

/**
 * Reusable avatar that shows an image when provided, otherwise falls back to
 * the first letter of the provided name.
 */
function UserAvatar({ name, src, size = 32, alt, sx }) {
  const initials = getInitial(name);
  return (
    <Avatar
      src={src || undefined}
      alt={alt || name || 'avatar'}
      sx={{ width: size, height: size, fontSize: Math.max(12, Math.floor(size * 0.45)), bgcolor: src ? undefined : '#e5e7eb', color: '#0f172a', ...sx }}
    >
      {!src && initials}
    </Avatar>
  );
}

export default UserAvatar;









