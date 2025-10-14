import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

// Floating bar data modeled as ranges: each bar "floats" between start and end.
// We render an invisible base bar (start) and a visible delta bar (end - start) stacked together.
const raw = [
  { name: 'Jan', start: 650, end: 760 },
  { name: 'Feb', start: 680, end: 780 },
  { name: 'Mar', start: 720, end: 840 },
  { name: 'Apr', start: 760, end: 920 },
  { name: 'May', start: 800, end: 980 },
  { name: 'Jun', start: 720, end: 900 },
  { name: 'Jul', start: 780, end: 960 },
  { name: 'Aug', start: 700, end: 870 },
  { name: 'Sep', start: 820, end: 980 },
  { name: 'Oct', start: 780, end: 930 },
  { name: 'Nov', start: 820, end: 1000 },
  { name: 'Dec', start: 800, end: 960 },
];

const data = raw.map(d => ({ name: d.name, base: d.start, delta: Math.max(0, d.end - d.start) }));

function BarChartCard() {
  const [year, setYear] = React.useState('2024');
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">Total User</p>
        <div className="w-24">
          <CustomSelect
            size="small"
            value={year}
            onChange={(e)=>setYear(e.target.value)}
            options={[{label:'2024', value:'2024'},{label:'2023', value:'2023'},{label:'2022', value:'2022'}]}
          />
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="10%" barGap={0}>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            {/* Invisible base to position the floating bars */}
            <Bar dataKey="base" stackId="a" fill="transparent" barSize={28} />
            {/* Visible delta renders as the floating portion */}
            <Bar dataKey="delta" stackId="a" radius={[6, 6, 6, 6]} fill="url(#grad)" barSize={28} />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.4} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    
    </div>
  );
}

export default BarChartCard;


