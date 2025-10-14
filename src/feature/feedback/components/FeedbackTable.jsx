import React from 'react';
import CustomTable from '../../../components/CustomTable';

const columns = [
  { header: 'Student Name', key: 'student' },
  { header: 'Trainer Name', key: 'trainer' },
  { header: 'Package', key: 'package' },
  { header: 'Location', key: 'location' },
  { header: 'Review', key: 'status' },
  { header: 'Action', key: 'action' },
];

const rows = [
  { id: 1, student: 'Bardet Michel', trainer: 'James Russell', package: '3 Month Package', location: 'Chennai', status: 'New' },
  { id: 2, student: 'Deven P', trainer: 'Kostner Jaydeep', package: '3 Month Package', location: 'Chennai', status: 'Seen' },
  { id: 3, student: 'Gouravkant S', trainer: 'Sagar Thorat', package: '3 Month Package', location: 'Chennai', status: 'New' },
  { id: 4, student: 'Robert Zy', trainer: 'Sagar Thorat', package: '3 Month Package', location: 'Chennai', status: 'New' },
  { id: 5, student: 'Guy Koch', trainer: 'Ebony Akru', package: '3 Month Package', location: 'Chennai', status: 'Seen' },
  { id: 6, student: 'Jerry Wira', trainer: 'Ebony Akru', package: '3 Month Package', location: 'Chennai', status: 'New' },
];

function Pill({ text }) {
  const tone = text === 'New' ? 'red' : 'gray';
  const cls = tone === 'red' ? 'bg-[#F6A5A5] text-black' : 'bg-gray-200 text-gray-800';
  return <span className={`px-2 py-1 rounded-xl text-xs ${cls}`}>{text}</span>;
}

function FeedbackTable() {
  return (
    <CustomTable
      title="Feedback"
      columns={columns}
      rows={rows}
      stickyHeader
      initialRowsPerPage={5}
      rowsPerPageOptions={[5, 10, 20]}
      renderCell={({ col, value }) => {
        if (col.key === 'status') return <Pill text={value} />;
        if (col.key === 'action') return <span className="text-gray-400">...</span>;
        return value;
      }}
      containerSx={{}}
    />
  );
}

export default FeedbackTable;


