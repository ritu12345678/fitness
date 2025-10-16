import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTable from '../../../../components/CustomTable';

const attendanceColumns = [
  { key: 'id', header: '#' },
  { key: 'dayIn', header: 'Day In' },
  { key: 'dayOut', header: 'Day Out' },
  { key: 'date', header: 'Date' },
  { key: 'studio', header: 'Studio Name' },
  { key: 'location', header: 'Location' },
  { key: 'shift', header: 'Shift' },
  {
    key: 'status',
    header: 'Status',
    render: (v) => {
      const isPresent = v.toLowerCase() === 'present';
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isPresent
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full mr-1 ${
              isPresent ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          {v}
        </span>
      );
    },
  },
];

const attendanceRows = [
  {
    id: 1,
    dayIn: '11:00 AM',
    dayOut: '07:00 PM',
    date: '2025-10-10',
    studio: 'Studio A',
    location: 'Chennai',
    shift: 'Morning',
    status: 'Present',
  },
  {
    id: 2,
    dayIn: '11:05 AM',
    dayOut: '07:10 PM',
    date: '2025-10-11',
    studio: 'Studio A',
    location: 'Chennai',
    shift: 'Morning',
    status: 'Absent',
  },
  {
    id: 3,
    dayIn: '11:02 AM',
    dayOut: '07:03 PM',
    date: '2025-10-12',
    studio: 'Studio A',
    location: 'Chennai',
    shift: 'Morning',
    status: 'Present',
  },
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

  return (
    <div className="p-2">
      <div className="bg-white border border-[#f8c6c6] rounded-xl py-1 px-24 shadow-sm">
        <Tabs
          value={value}
          onChange={(_e, v) => setValue(v)}
          sx={{
            minHeight: 36,
            '& .MuiTab-root': { minHeight: 36, textTransform: 'none' },
          }}
        >
          <Tab label="Attendance" />
          <Tab label="Pay Slip" />
          <Tab label="Batch" />
        </Tabs>
      </div>

      {/* Attendance Table */}
      <Panel value={value} index={0}>
        <CustomTable
          columns={attendanceColumns}
          data={attendanceRows}
          enablePagination={false}
        />
      </Panel>

      {/* Pay Slip */}
      <Panel value={value} index={1}>
        <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
          <CustomTable
            columns={[
              { key: 'id', header: '#' },
              { key: 'txnId', header: 'Transaction ID' },
              { key: 'credited', header: 'Credited Amount' },
              { key: 'method', header: 'Method' },
              { key: 'salary', header: 'Salary Period' },
              { key: 'date', header: 'Date & Time' },
              { key: 'status', header: 'Status', render: (v) => (
                <span className={v === 'Successful' ? 'text-green-600' : 'text-red-600'}>{v}</span>
              )},
            ]}
            rows={[
              { id: 1, txnId: '#23534564356', credited: 1000, method: 'Bank', salary: '1 March - 31 March', date: '11.30 AM 12-Apr-2024', status: 'Successful' },
              { id: 2, txnId: '#23534564356', credited: 1000, method: 'Bank', salary: '1 February - 28 February', date: '09.50 AM 1-Feb-2024', status: 'Successful' },
              { id: 3, txnId: '#23534564356', credited: 1000, method: 'Bank', salary: '1 January - 31 January', date: '10.45 AM 1-Jan-2024', status: 'Failed' },
            ]}
            keyField="id"
            initialRowsPerPage={3}
            rowsPerPageOptions={[3]}
          />
        </div>
      </Panel>

      {/* Batch */}
      <Panel value={value} index={2}>
        <div className='bg-white border border-[#f8c6c6] rounded-xl p-3 shadow-sm'>
          <CustomTable
            columns={[
              { key: 'id', header: '#' },
              { key: 'batch', header: 'Batch Number' },
              { key: 'package', header: 'Package' },
              { key: 'start', header: 'Start Date' },
              { key: 'end', header: 'End Date' },
              { key: 'location', header: 'Location' },
              { key: 'session', header: 'Session' },
              { key: 'members', header: 'Total Members' },
            ]}
            rows={[
              { id: 1, batch: 'Batch 1', package: '3 Month Package', start: '12-Apr-2024', end: '12-Jun-2024', location: 'Chennai', session: 36, members: 14 },
              { id: 2, batch: 'Batch 2', package: '3 Month Package', start: '12-Apr-2024', end: '12-Jun-2024', location: 'Chennai', session: 36, members: 14 },
              { id: 3, batch: 'Batch 3', package: '3 Month Package', start: '12-Apr-2024', end: '12-Jun-2024', location: 'Chennai', session: 36, members: 14 },
            ]}
            keyField="id"
            initialRowsPerPage={3}
            rowsPerPageOptions={[3]}
          />
        </div>
      </Panel>
    </div>
  );
}

export default DetailTabs;
