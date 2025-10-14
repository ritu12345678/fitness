import React from 'react';
import CustomTable from '../../../components/CustomTable';

const columns = [
  { header: 'Studio Name', key: 'name' },
  { header: 'Location', key: 'location' },
  { header: 'Total Beginner', key: 'beg' },
  { header: 'Total Advance', key: 'adv' },
  { header: 'Total Intermediate', key: 'inter' },
];
const rows = [
  { name: 'Studio Name', location: 'Mumbai', beg: 400, adv: 750, inter: 600 },
  { name: 'Studio Name', location: 'Mumbai', beg: 360, adv: 700, inter: 550 },
  { name: 'Studio Name', location: 'Mumbai', beg: 250, adv: 600, inter: 450 },
  { name: 'Studio Name', location: 'Mumbai', beg: 180, adv: 420, inter: 300 },
  { name: 'Studio Name', location: 'Mumbai', beg: 150, adv: 320, inter: 250 },
];

function TopStudiosTable() {
  return (
    <CustomTable title="Top Studio" columns={columns} rows={rows} />
  );
}

export default TopStudiosTable;


