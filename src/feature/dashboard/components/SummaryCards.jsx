import React from 'react';
import StatCard from './StatCard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InterpreterModeOutlinedIcon from '@mui/icons-material/InterpreterModeOutlined';
const summaryCards = [
  { title: 'Total User', value: 360, iconBg: 'bg-green-100', iconDot: 'bg-green-400' },
  { title: 'Total Trainer', value: 120, iconBg: 'bg-blue-100', iconDot: 'bg-blue-400' },
  { title: 'Total Studio', value: 360, iconBg: 'bg-yellow-100', iconDot: 'bg-yellow-400' },
];

function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      <StatCard title={"Total User"} value={360} icon={<PersonOutlineOutlinedIcon style={{ color: '#C6E55E' }} />} />
      <StatCard title={"Total User"} value={360} icon={<InterpreterModeOutlinedIcon style={{ color: "#4986ED" }} />} />
      <StatCard title={"Total User"} value={360} icon={<PersonOutlineOutlinedIcon style={{ color: '#C6E55E' }} />} />
    </div>
  );
}

export default SummaryCards;


