import React from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CustomTable from '../../../components/CustomTable';
import UserAvatar from '../../../components/UserAvatar';

const columns = [
  { header: '#', key: 'serial', className: 'w-8' },
  { header: 'Profile', key: 'profile', className: 'w-10' },
  { header: 'Name', key: 'name' },
  { header: 'Mobile Number', key: 'mobile' },
  { header: 'Email', key: 'email' },
  { header: 'Location', key: 'location' },
  { header: 'Fees Due Days', key: 'due', className: 'text-red-500 font-semibold' },
  { header: 'Action', key: 'action', className: 'w-12' },
];

const rows = [
  { id: 1, name: 'Gowrav', mobile: '7845632100', email: 'xxx@gmail.com', location: 'Mosta', due: 5, avatar: 'https://i.pravatar.cc/100?img=11' },
  { id: 2, name: 'Thomas K.', mobile: '7845632100', email: 'xxx@gmail.com', location: 'Rajkot', due: 20, avatar: 'https://i.pravatar.cc/100?img=12' },
  { id: 3, name: 'Darlene', mobile: '7845632100', email: 'xxx@gmail.com', location: 'Meesta', due: 15, avatar: 'https://i.pravatar.cc/100?img=13' },
  { id: 4, name: 'Courtney', mobile: '7845632100', email: 'xxx@gmail.com', location: 'Gareesh', due: 10, avatar: 'https://i.pravatar.cc/100?img=14' },
  { id: 5, name: 'Spencer', mobile: '7845632100', email: 'xxx@gmail.com', location: 'Gareesh', due: 12, avatar: 'https://i.pravatar.cc/100?img=15' },
];

function PackageExpiryTable() {
  return (
    <CustomTable
      title="Package Expiry"
      columns={columns}
      rows={rows.map((r, idx) => ({ ...r, serial: idx + 1 }))}
      renderCell={({ row, col, value }) => {
        if (col.key === 'profile') {
          return <UserAvatar name={row.name} src={row.avatar} size={28} />;
        }
        if (col.key === 'action') {
          return (
            <div className="flex items-center justify-center">
              <span className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center">
                <NotificationsActiveIcon sx={{ fontSize: 16 }} />
              </span>
            </div>
          );
        }
        return value;
      }}
    />
  );
}

export default PackageExpiryTable;


