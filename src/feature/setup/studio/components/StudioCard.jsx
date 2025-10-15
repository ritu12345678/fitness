import React from 'react';
import { Card, CardContent, CardMedia, Switch } from '@mui/material';

const StudioCard = ({ studio }) => {
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }} variant="outlined">
      <CardMedia
        component="img"
        height="180"
        image={studio.image}
        alt={studio.title}
        sx={{ objectFit: 'cover', transition: 'transform .2s', '&:hover': { transform: 'scale(1.02)' } }}
      />
      <CardContent>
        <p className="text-sm font-medium text-gray-900">{studio.title}</p>
        <p className="text-xs text-gray-500">{studio.address}</p>
        <p className="text-xs text-gray-500">{studio.time}</p>
        <p className="text-sm font-semibold">{studio.price}</p>
        <div className="flex items-center justify-between mt-2">
          <button className="text-xs text-gray-500 underline">Edit</button>
          <Switch size="small" defaultChecked={studio.active} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudioCard;


