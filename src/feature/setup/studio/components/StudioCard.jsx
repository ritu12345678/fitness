import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Switch, IconButton } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { apiService } from '../../../../services/apiClient';
import { useToast } from '../../../../hooks/useToast';
import EditNoteIcon from '@mui/icons-material/EditNote';
const StudioCard = ({ studio, onEdit }) => {
  const { showSuccess, showError } = useToast();
  const [isToggling, setIsToggling] = useState(false);
  const [localStatus, setLocalStatus] = useState(null);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(studio);
    }
  };

  const handleToggleStatus = async (event) => {
    const newStatus = event.target.checked;
    setIsToggling(true);
    
    try {
     
      
      
      const response = await apiService.put('admin/studios/update', { 
        id: studio?.studio_id, 
        status: newStatus ? 1 : 0 
      });
      
      // Update local state immediately
      setLocalStatus(newStatus ? 1 : 0);
      
      showSuccess(`Studio ${newStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      showError(error?.response?.data?.message || error?.message || 'Failed to update studio status. Please try again.');
    } finally {
      setIsToggling(false);
    }
  };

  // Format location display
  const getLocationDisplay = () => {
    if (studio.address_1) {
      return `${studio.address_1},${studio.address_2}, ${studio.city}`;
    } else if (studio.address1) {
      return `${studio.address1},${studio.address2}, ${studio.city}`;
    } else if (studio.address) {
      return studio.address;
    }
    return '--';
  };

  // Format time display
  const getTimeDisplay = () => {
    if (studio.from && studio.to) {
      return `${studio.from} - ${studio.to}`;
    } else if (studio.time) {
      return studio.time;
    }
    return '--';
  };

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }} variant="outlined">
      <CardMedia
        component="img"
        height="180"
        image={studio.image || 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop'}
        alt={studio.name || studio.title}
        sx={{ objectFit: 'cover', transition: 'transform .2s', '&:hover': { transform: 'scale(1.02)' } }}
      />
      <CardContent>
        <p className="text-sm font-medium text-gray-900 capitalize">{studio.name || "--"}</p>
        
        {/* Location with icon */}
        <div className="flex items-center gap-1 mt-1">
          <LocationOnOutlinedIcon sx={{ fontSize: 14, color: '#6b7280' }} />
          <p className="text-xs text-gray-500">{getLocationDisplay()}</p>
        </div>
        
        {/* Time with icon */}
        <div className="flex items-center gap-1 mt-1">
          <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: '#6b7280' }} />
          <p className="text-xs text-gray-500">{getTimeDisplay()}</p>
        </div>
        
        <p className="text-sm font-semibold mt-2">
          {studio.starting_amount? `₹${studio.starting_amount}/Mo*` : "--"}
        </p>
        
        <div className="flex items-center justify-between mt-2">
        
           <button onClick={() => handleEdit()} className="text-xs inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <EditNoteIcon sx={{ fontSize: 16 }} /> Edit
          </button>
          <Switch 
            size="small" 
            checked={localStatus !== null ? localStatus === 1 : (studio.active || studio.status === 'Active' || studio.status === 1)} 
            onChange={handleToggleStatus}
            disabled={isToggling}
            sx={{
              '& .MuiSwitch-thumb': {
                width: 16,
                height: 16,
              },
              '& .MuiSwitch-track': {
                height: 12,
                borderRadius: 6,
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudioCard;


