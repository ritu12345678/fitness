import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTable from '../../../../components/CustomTable';

const subscriptionColumns = [
  { key: 'id', header: '#' },
  { key: 'package', header: 'Package Name' },
  { key: 'studio', header: 'Studio Name' },
  { key: 'location', header: 'Location' },
  { key: 'session', header: 'Session' },
  { key: 'days', header: 'Days' },
  { key: 'category', header: 'Category' },
  { key: 'duration', header: 'Duration' },
  { key: 'time', header: 'Time' },
  { key: 'status', header: 'Status', render: (v) => (
    <span className="inline-flex items-center gap-2 text-green-600">
      {/* <span className="h-2 w-2  bg-green-500" /> */}
      {v}
    </span>
  ) },
];

const subscriptionRows = [
  { id: 1, package: 'Package Name', studio: 'Studio Name', location: 'Chennai', session: '5/10', days: 'Wed, Fri, Sat', category: 'Beginner', duration: '3 Months', time: 'Afternoon', status: 'Activated' },
  { id: 2, package: 'Package Name', studio: 'Studio Name', location: 'Chennai', session: '5/10', days: 'Wed, Fri, Sat', category: 'Beginner', duration: '1 Months', time: 'Afternoon', status: 'Activated' },
  { id: 3, package: 'Package Name', studio: 'Studio Name', location: 'Chennai', session: '5/10', days: 'Wed, Fri, Sat', category: 'Beginner', duration: '6 Months', time: 'Afternoon', status: 'Activated' },
];

function Panel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function DetailTabs() {
  const [value, setValue] = React.useState(0);
  return (<>
    <div className=" p-2 ">
      <div className='bg-white border border-gray-200 rounded-xl py-1 px-24 shadow-sm'>
      <Tabs value={value} onChange={(_e, v) => setValue(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: 'none' } }}>
        <Tab label="Subscription" />
        <Tab label="Refer and Earn" />
        <Tab label="Wallet" />
      </Tabs></div>
      <Panel value={value} index={0}>
        <CustomTable columns={subscriptionColumns} data={subscriptionRows} enablePagination={false} />
      </Panel>
      <Panel value={value} index={1}>
        <div className="text-sm text-gray-500">No referrals yet.</div>
      </Panel>
      <Panel value={value} index={2}>
        <div className="text-sm text-gray-500">Wallet activity will appear here.</div>
      </Panel>
    </div>
  </>);
}

export default DetailTabs;


