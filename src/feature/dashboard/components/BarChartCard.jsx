import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const data = [
  { name: 'Jan', users: 700 }, { name: 'Feb', users: 750 }, { name: 'Mar', users: 820 }, { name: 'Apr', users: 900 },
  { name: 'May', users: 950 }, { name: 'Jun', users: 880 }, { name: 'Jul', users: 930 }, { name: 'Aug', users: 860 },
  { name: 'Sep', users: 980 }, { name: 'Oct', users: 920 }, { name: 'Nov', users: 990 }, { name: 'Dec', users: 940 }
];

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
          <BarChart data={data}>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="users" radius={[6, 6, 0, 0]} fill="url(#grad)" />
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


