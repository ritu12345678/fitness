import React from 'react';
import CustomTable from '../../../components/CustomTable';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function useColumns(onOpenMenu) {
  return [
    { key: 'id', header: '#' },
    { key: 'batchNumber', header: 'Batch Number' },
    { key: 'trainerName', header: 'Trainer Name' },
    { key: 'package', header: 'Package' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'location', header: 'Location' },
    { key: 'sessions', header: 'Sessions' },
    { key: 'totalMembers', header: 'Total Members' },
    {
      key: 'action',
      header: 'Action',
      render: (_v, row) => (
        <IconButton size="small" onClick={(e) => onOpenMenu(e.currentTarget, row)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];
}

const rows = [
  {
    id: 1,
    batchNumber: 'Batch 1',
    trainerName: 'Abhishek Sharma',
    package: '3 Month Package',
    startDate: '10 Oct 2025',
    endDate: '10 Jan 2026',
    location: 'Delhi',
    sessions: 36,
    totalMembers: 12,
  },
  {
    id: 2,
    batchNumber: 'Batch 2',
    trainerName: 'Neha Singh',
    package: '6 Month Package',
    startDate: '15 Oct 2025',
    endDate: '15 Apr 2026',
    location: 'Mumbai',
    sessions: 72,
    totalMembers: 20,
  },
  {
    id: 3,
    batchNumber: 'Batch 3',
    trainerName: 'Rohit Verma',
    package: '1 Month Package',
    startDate: '01 Nov 2025',
    endDate: '01 Dec 2025',
    location: 'Pune',
    sessions: 12,
    totalMembers: 8,
  },
];

function BatchTable() {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleOpenMenu = (anchor, row) => {
    setMenuAnchor(anchor);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleDetail = () => {
    handleClose();
    navigate('/batch/detail'); // ✅ better route naming
  };

  const columns = useColumns(handleOpenMenu);

  return (
    <>
      <CustomTable columns={columns} data={rows} />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
      </Menu>
    </>
  );
}

export default BatchTable;
