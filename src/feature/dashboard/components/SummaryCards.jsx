import React from 'react';
import { useSelector } from 'react-redux';
import StatCard from './StatCard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InterpreterModeOutlinedIcon from '@mui/icons-material/InterpreterModeOutlined';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function SummaryCards() {
  const { stats, loading } = useSelector((state) => state.dashboard);
console.log("stats",stats,loading)
  // Show loading state for individual cards
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Users" 
        value={stats.totalUsers || 0} 
        icon={<PersonOutlineOutlinedIcon style={{ color: '#10B981' }} />} 
      />
      <StatCard 
        title="Total Trainers" 
        value={stats.totalTrainers || 0} 
        icon={<InterpreterModeOutlinedIcon style={{ color: "#3B82F6" }} />} 
      />
      <StatCard 
        title="Total Studios" 
        value={stats.totalStudios || 0} 
        icon={<FitnessCenterIcon style={{ color: '#F59E0B' }} />} 
      />
      <StatCard 
        title="Total Revenue" 
        value={`$${stats.totalRevenue || 0}`} 
        icon={<AttachMoneyIcon style={{ color: '#EF4444' }} />} 
      />
    </div>
  );
}

export default SummaryCards;











