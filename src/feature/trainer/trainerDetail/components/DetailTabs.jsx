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
      <div className="bg-white border border-gray-200 rounded-xl py-1 px-24 shadow-sm">
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
        <div className="text-sm text-gray-500">No pay slips available yet.</div>
      </Panel>

      {/* Batch */}
      <Panel value={value} index={2}>
        <div className="text-sm text-gray-500">
          Batch details will appear here.
        </div>
      </Panel>
    </div>
  );
}

export default DetailTabs;
