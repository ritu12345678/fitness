import React from 'react';
import CustomTable from '../../../components/CustomTable';
import UserAvatar from '../../../components/UserAvatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function useColumns(onOpenMenu) {
  return [
    { key: 'id', header: '#' },
    {
      key: 'profile',
      header: 'Profile',
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.name} src={row.avatar} size={28} />
        </div>
      ),
    },
    { key: 'name', header: 'Name' },
    { key: 'mobile', header: 'Mobile Number' },
    { key: 'role', header: 'Role' },
    { key: 'location', header: 'Location' },
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
  { id: 1, name: 'Eleanor Pena', mobile: '784532690', role: 'Worker', location: 'Madan', avatar: 'https://i.pravatar.cc/40?img=21' },
  { id: 2, name: 'Theresa Webb', mobile: '784532690', role: 'Trainer', location: 'Rathi', avatar: 'https://i.pravatar.cc/40?img=22' },
  { id: 3, name: 'Annette Black', mobile: '784532690', role: 'Supervisor', location: 'Rathi', avatar: 'https://i.pravatar.cc/40?img=23' },
  { id: 4, name: 'Darlene Robertson', mobile: '784532690', role: 'Worker', location: 'Madan', avatar: 'https://i.pravatar.cc/40?img=24' },
  { id: 5, name: 'Devon Lane', mobile: '784532690', role: 'Trainer', location: 'Ganezh', avatar: 'https://i.pravatar.cc/40?img=25' },
  { id: 6, name: 'Savannah Nguyen', mobile: '784532690', role: 'Assistant', location: 'Ganezh', avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 7, name: 'Kristin Watson', mobile: '784532690', role: 'Worker', location: 'Ganezh', avatar: 'https://i.pravatar.cc/40?img=27' },
];

function TrainerTable() {
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
    navigate('/trainer/detail');
  };
  const handleEdit = () => {
    handleClose();
    navigate('/trainer/detail');
  };

  const columns = useColumns(handleOpenMenu);

  return (
    <>
      <CustomTable columns={columns} data={rows} />
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
    </>
  );
}

export default TrainerTable;
