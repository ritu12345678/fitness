import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTable from '../../../../components/CustomTable';
import { formatDate } from '../../../../constants';

const subscriptionColumns = [
  { 
    key: 'id', 
    header: '#', 
    render: (_v, _row, index) => index + 1 
  },
  { 
    key: 'package_name', 
    header: 'Package Name',
    render: (v, row) => row?.package?.name || row?.name || '-'
  },
  { 
    key: 'studio_name', 
    header: 'Studio Name',
    render: (v, row) => row?.studio_name || row?.studio?.name || row?.studioName || '-'
  },
  { 
    key: 'location', 
    header: 'Location',
    render: (v, row) => row?.location || row?.studio_location || row?.address || '-'
  },
  { 
    key: 'session', 
    header: 'Session',
    render: (v, row) => row?.package?.session || row?.session || '-'
  },
 {
  key: 'days',
  header: 'Days',
  render: (_v, row) => {
    const days = row?.days;

    if (!Array.isArray(days) || days.length === 0) return '-';

    // Capitalize first letter of each day just in case they're lowercase
    const formattedDays = days.map(
      d => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
    );

    return formattedDays.join(', ');
  },
},

  { 
    key: 'classesCategory', 
    header: 'Category',
    render: (v, row) => row?.package?.classesCategory ||'-'
  },
  { 
    key: 'Duraciton', 
    header: 'Duration',
    render: (v, row) => row?.Duraciton || '-'
  },
  { 
    key: 'time', 
    header: 'Time',
    render: (v, row) => row?.time || row?.class_time || row?.schedule_time || '-'
  },
  { 
    key: 'status', 
    header: 'Status', 
    render: (v, row) => {
      const status = row?.package?.status || row?.status || row?.subscriptionStatus || row?.active || '-';
      
      // Convert boolean true/false to text
      let statusText = status;
      if (status === true) statusText = 'Active';
      if (status === false) statusText = 'Inactive';
      if (status === 'true') statusText = 'Active';
      if (status === 'false') statusText = 'Inactive';
      
      // Determine if status is active
      const isActive = status === 'active' || status === 'Active' || status === true || status === 'true';
      
      return (
        <span className={`inline-flex items-center gap-2 ${
          isActive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className={`h-2 w-2 rounded-full ${
            isActive ? 'bg-green-500' : 'bg-red-500'
          }`} />
          {statusText}
        </span>
      );
    }
  },
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
  { key: 'id', header: '#',  render: (_v, _row, index) => index + 1  },
  { key: 'Transaction_ID', header: 'Transaction ID' },
  { key: 'amount', header: 'Credited Amount' },
  {
    key: 'method',
    header: 'Method',
    render: (_v, row) => row?.payment_method?.name || '-', // ✅ show method name
  },
  {
    key: 'transaction_date',
    header: 'Date & Time',
    render: (_v, row) =>
      row?.transaction_date ? formatDate(row.transaction_date) : 'N/A', // ✅ fixed
  },
  {
    key: 'status',
    header: 'Status',
    render: (v,row) => (
      <span
        className={
          v === 'Successful' || v === 'completed'
            ? 'text-green-600'
            : 'text-red-600'
        }
      >
        {row?.status}
      </span>
    ),
  },
];




// Refer & Earn columns function - referral code comes from main user data, rest from referral info
const getReferColumns = (user) => [
  { key: 'id', header: '#',  render: (_v, _row, index) => index + 1  },
  { key: 'name', header: 'User Name' },
  {
    key: 'referralCode',
    header: 'Referral Code',
    render: () => user?.user?.referNo || '-', // Always show main user's referral code
  },
  {
    key: 'created_at',
    header: 'Date & Time',
    render: (_v, row) => row?.created_at ? formatDate(row.created_at) : '-',
  },
  {
    key: 'status',
    header: 'Status',
    render: (v) => (
      <span className={v === 'Successful' ? 'text-green-600' : 'text-red-600'}>
        {v ?? '-'}
      </span>
    ),
  },
];




function Panel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function InnerWalletTabs({data}) {
  const [tab, setTab] = React.useState(0);
  
  // Filter transactions based on transactionDrCr field
  const walletTransactions = data?.filter(transaction => transaction.transactionDrCr === 'CR') || [];
  const paymentLogs = data?.filter(transaction => transaction.transactionDrCr === 'DR') || [];
  
  return (
    <>
      <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: 'none' } }}>
        <Tab label="Wallet Transaction" />
        <Tab label="Payment Logs" />
      </Tabs>
      <div className='mt-3'>
        {tab === 0 && (
          <CustomTable columns={walletTxnColumns} rows={walletTransactions} keyField="Transaction_ID" initialRowsPerPage={4} rowsPerPageOptions={[4]} />
        )}
        {tab === 1 && (
          <CustomTable columns={paymentLogColumns} rows={paymentLogs} keyField="Transaction_ID" initialRowsPerPage={3} rowsPerPageOptions={[3]} />
        )}
      </div>
    </>
  );
}

function DetailTabs({ user }) {

  const [value, setValue] = React.useState(0);
  
  // Get referral columns with user data - referral code comes from main user, rest from referral info
  const referColumns = getReferColumns(user);
  return (
    <>
      <div className="p-2">
        <div className='bg-white border border-[#f8c6c6] rounded-xl py-1 px-24 shadow-sm'>
          <Tabs value={value} onChange={(_e, v) => setValue(v)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: 'none' } }}>
            <Tab label="Subscription" />
            <Tab label="Refer And Earn" />
            <Tab label="Wallet" />
          </Tabs>
        </div>
        <Panel value={value} index={0}>
          <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
            {user?.packageMapUsers && user.packageMapUsers.length > 0 ? (
              <CustomTable 
                columns={subscriptionColumns} 
                rows={user.packageMapUsers} 
                enablePagination={false} 
              />
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg font-medium mb-2">
                  No subscription data found
                </div>
                <div className="text-sm text-gray-400">
                  This user doesn't have any active subscriptions.
                </div>
              </div>
            )}
          </div>
        </Panel>
        <Panel value={value} index={1}>
          <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
            <CustomTable columns={referColumns} rows={user?.referral?.referralInfo} keyField="id" initialRowsPerPage={3} rowsPerPageOptions={[3]} />
          </div>
        </Panel>
        <Panel value={value} index={2}>
          <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
            {/* Inner tabs for Wallet */}
            <InnerWalletTabs data={user?.transactions}/>
          </div>
        </Panel>
      </div>
    </>
  );
}

export default DetailTabs;