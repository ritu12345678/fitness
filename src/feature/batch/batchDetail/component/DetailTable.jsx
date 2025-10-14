import React from 'react';
import CustomTable from '../../../../components/CustomTable';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function useColumns(onOpenMenu) {
  return [
    { key: 'id', header: '#' },
    { key: 'trainerName', header: 'Trainer Name' },
    { key: 'level', header: 'Level' },
    { key: 'completedSessions', header: 'Completed Sessions' },
    { key: 'attendance', header: 'Attendance' },
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
    trainerName: 'Abhishek Sharma',
    level: 'Intermediate',
    completedSessions: 24,
    attendance: '95%',
  },
  {
    id: 2,
    trainerName: 'Neha Singh',
    level: 'Advanced',
    completedSessions: 36,
    attendance: '98%',
  },
  {
    id: 3,
    trainerName: 'Rohit Verma',
    level: 'Beginner',
    completedSessions: 12,
    attendance: '89%',
  },
];

function DetailTable() {
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
    navigate('/batch/detail'); // ✅ consistent route
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

export default DetailTable;
