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
    { key: 'email', header: 'Email' },
    { key: 'location', header: 'Location' },
    { key: 'feesDue', header: 'Fees Due Date' },
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
  { id: 1, name: 'Eleanor Pena', mobile: '784532690', email: 'xxx@gmail.com', location: 'Madan', feesDue: '5', avatar: 'https://i.pravatar.cc/40?img=21' },
  { id: 2, name: 'Theresa Webb', mobile: '784532690', email: 'xxx@gmail.com', location: 'Rathi', feesDue: '6', avatar: 'https://i.pravatar.cc/40?img=22' },
  { id: 3, name: 'Annette Black', mobile: '784532690', email: 'xxx@gmail.com', location: 'Rathi', feesDue: '20', avatar: 'https://i.pravatar.cc/40?img=23' },
  { id: 4, name: 'Darlene Robertson', mobile: '784532690', email: 'xxx@gmail.com', location: 'Madan', feesDue: '15', avatar: 'https://i.pravatar.cc/40?img=24' },
  { id: 5, name: 'Devon Lane', mobile: '784532690', email: 'xxx@gmail.com', location: 'Ganezh', feesDue: '15', avatar: 'https://i.pravatar.cc/40?img=25' },
  { id: 6, name: 'Savannah Nguyen', mobile: '784532690', email: 'xxx@gmail.com', location: 'Ganezh', feesDue: '15', avatar: 'https://i.pravatar.cc/40?img=26' },
  { id: 7, name: 'Kristin Watson', mobile: '784532690', email: 'xxx@gmail.com', location: 'Ganezh', feesDue: '15', avatar: 'https://i.pravatar.cc/40?img=27' },
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
    navigate('/user/detail');
  };
  const handleEdit = () => {
    handleClose();
    // Placeholder for edit action
    navigate('/user/detail');
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


