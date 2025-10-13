import React from 'react';
import CustomSelect from '../../../components/CustomSelect';

function CalendarCard() {
  const [range, setRange] = React.useState('monthly');
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-h-[420px] h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Calendar</p>
        <div className="w-28">
          <CustomSelect
            size="small"
            label=""
            value={range}
            onChange={(e)=>setRange(e.target.value)}
            options={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Weekly', value: 'weekly' },
              { label: 'Daily', value: 'daily' },
            ]}
            SelectProps={{ displayEmpty: true }}
          />
        </div>
      </div>
      <div className="text-gray-400 text-sm">Calendar placeholder</div>
    </div>
  );
}

export default CalendarCard;


