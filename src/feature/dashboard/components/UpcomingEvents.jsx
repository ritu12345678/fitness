import React from 'react';
import CustomTable from '../../../components/CustomTable';
import UserAvatar from '../../../components/UserAvatar';
import CustomSelect from '../../../components/CustomSelect';

const columns = [
  { key: 'profile', header: 'Profile', render: (_v, row) => (
    <div className="flex items-center gap-3">
      <UserAvatar name={row.clientName} src={row.avatar} size={28} />
    </div>
  ) },
  { key: 'clientName', header: 'Client Name', render: (v) => <span>{v}</span> },
  { key: 'className', header: 'Class Name' },
  { key: 'session', header: 'Session' },
  { key: 'batchNo', header: 'Batch No' },
];

const data = [
  { id: 1, profile: 'E', clientName: 'Edwards', avatar: 'https://i.pravatar.cc/40?img=11', className: 'Full Body', session: '12.05', batchNo: 5 },
  { id: 2, profile: 'M', clientName: 'Murphy', avatar: 'https://i.pravatar.cc/40?img=12', className: 'Full Body', session: '12.05', batchNo: 6 },
  { id: 3, profile: 'A', clientName: 'Annette', avatar: 'https://i.pravatar.cc/40?img=13', className: 'Full Body', session: '12.05', batchNo: 450 },
  { id: 4, profile: 'R', clientName: 'Richards', avatar: 'https://i.pravatar.cc/40?img=14', className: 'Full Body', session: '12.05', batchNo: 320 },
  { id: 5, profile: 'A', clientName: 'Albert', avatar: 'https://i.pravatar.cc/40?img=15', className: 'Full Body', session: '12.05', batchNo: 230 },
  { id: 6, profile: 'R', clientName: 'Russell', avatar: 'https://i.pravatar.cc/40?img=16', className: 'Full Body', session: '12.05', batchNo: 120 },
  { id: 7, profile: 'M', clientName: 'McKinney', avatar: 'https://i.pravatar.cc/40?img=17', className: 'Full Body', session: '12.05', batchNo: 150 },
];

function UpcomingEvents() {
  const [studio, setStudio] = React.useState('studio-1');
  const [time, setTime] = React.useState('7:00');
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm min-h-[420px] h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">Upcoming Events</p>
        <div className="flex items-center gap-2">
          <div className="w-36">
            <CustomSelect
              size="small"
              value={studio}
              onChange={(e)=>setStudio(e.target.value)}
              options={[
                { label: 'Studio Name', value: 'studio-1' },
                { label: 'Studio A', value: 'studio-a' },
                { label: 'Studio B', value: 'studio-b' },
              ]}
            />
          </div>
          <div className="w-28">
            <CustomSelect
              size="small"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              options={[
                { label: '7:00 AM', value: '7:00' },
                { label: '8:00 AM', value: '8:00' },
                { label: '9:00 AM', value: '9:00' },
              ]}
            />
          </div>
        </div>
      </div>
      <CustomTable columns={columns} data={data} enablePagination={false} />
    </div>
  );
}

export default UpcomingEvents;


