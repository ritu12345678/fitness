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

// Wallet Transaction (left) columns
const walletTxnColumns = [
  { key: 'id', header: '#' },
  { key: 'package', header: 'Package Name' },
  { key: 'studio', header: 'Studio Name' },
  { key: 'location', header: 'Location' },
  { key: 'deduction', header: 'Deduction Amount' },
  { key: 'date', header: 'Date & Time' },
  { key: 'status', header: 'Status', render: (v) => (
    <span className={v === 'Successful' ? 'text-green-600' : 'text-red-600'}>{v}</span>
  ) },
];

const walletTxnRows = [1,2,3,4].map((i) => ({
  id: i,
  package: 'Package Name',
  studio: 'Studio Name',
  location: 'Chennai',
  deduction: 1000,
  date: '11.30 AM 12-Apr-2024',
  status: i === 4 ? 'Successful' : 'Successful',
}));

// Payment Logs (right) columns
const paymentLogColumns = [
  { key: 'id', header: '#' },
  { key: 'txnId', header: 'Transaction ID' },
  { key: 'credited', header: 'Credited Amount' },
  { key: 'method', header: 'Method' },
  { key: 'date', header: 'Date & Time' },
  { key: 'status', header: 'Status', render: (v) => (
    <span className={v === 'Successful' ? 'text-green-600' : 'text-red-600'}>{v}</span>
  ) },
];

const paymentLogRows = [
  { id: 1, txnId: '#23534564356', credited: 1000, method: 'Upi', date: '11.30 AM 12-Apr-2024', status: 'Successful' },
  { id: 2, txnId: '#23534564356', credited: 1000, method: 'Upi', date: '09.54 AM 12-Apr-2024', status: 'Successful' },
  { id: 3, txnId: '#23534564356', credited: 1000, method: 'Razor Pay', date: '10.45 AM 12-Apr-2024', status: 'Failed' },
];

// Refer & Earn columns (bottom section in screenshot 3)
const referColumns = [
  { key: 'id', header: '#' },
  { key: 'user', header: 'User Name' },
  { key: 'ref', header: 'Referral Code' },
  { key: 'code', header: 'Code' },
  { key: 'date', header: 'Date & Time' },
  { key: 'status', header: 'Status', render: (v) => (
    <span className={v === 'Successful' ? 'text-green-600' : 'text-red-600'}>{v}</span>
  ) },
];

const referRows = [
  { id: 1, user: '#23534564356', ref: 1000, code: 'ABC1234#25', date: '11.30 AM 12-Apr-2024', status: 'Successful' },
  { id: 2, user: '#23534564356', ref: 1000, code: 'ABC1234#25', date: '09.54 AM 12-Apr-2024', status: 'Successful' },
  { id: 3, user: '#23534564356', ref: 1000, code: 'ABC1234#25', date: '10.45 AM 12-Apr-2024', status: 'Failed' },
];

function Panel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function InnerWalletTabs() {
  const [tab, setTab] = React.useState(0);
  return (
    <>
      <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: 'none' } }}>
        <Tab label="Wallet Transaction" />
        <Tab label="Payment Logs" />
      </Tabs>
      <div className='mt-3'>
        {tab === 0 && (
          <CustomTable columns={walletTxnColumns} rows={walletTxnRows} keyField="id" initialRowsPerPage={4} rowsPerPageOptions={[4]} />
        )}
        {tab === 1 && (
          <CustomTable columns={paymentLogColumns} rows={paymentLogRows} keyField="id" initialRowsPerPage={3} rowsPerPageOptions={[3]} />
        )}
      </div>
    </>
  );
}

function DetailTabs() {
  const [value, setValue] = React.useState(0);
  return (<>
    <div className=" p-2 ">
      <div className='bg-white border border-[#f8c6c6] rounded-xl py-1 px-24 shadow-sm'>
      <Tabs value={value} onChange={(_e, v) => setValue(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: 'none' } }}>
        <Tab label="Subscription" />
        <Tab label="Refer And Earn" />
        <Tab label="Wallet" />
      </Tabs></div>
      <Panel value={value} index={0}>
        <CustomTable columns={subscriptionColumns} data={subscriptionRows} enablePagination={false} />
      </Panel>
      <Panel value={value} index={1}>
        <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
          <CustomTable columns={referColumns} rows={referRows} keyField="id" initialRowsPerPage={3} rowsPerPageOptions={[3]} />
        </div>
      </Panel>
      <Panel value={value} index={2}>
        <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
          {/* Inner tabs for Wallet */}
          <InnerWalletTabs />
        </div>
      </Panel>
    </div>
  </>);
}

export default DetailTabs;


