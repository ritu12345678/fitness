import React from 'react';
import UserAvatar from '../../../components/UserAvatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../constantFunctions";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
function useColumns(onOpenMenu, page, rowsPerPage) {
  return [
    { 
      key: 'sno', 
      header: 'S.No',
      render: (_v, row, index) => (
        <span>{page * rowsPerPage + index + 1}</span>
      )
    },
    {
      key: 'profile',
      header: 'Profile',
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <UserAvatar name={row.name} src={row.avatar} size={28} />
        </div>
      ),
    },
    { 
      key: 'name', 
      header: 'Name',
      render: (_v, row) => (
        <span className="capitalize">{row.name}</span>
      )
    },
    { key: 'mobile', header: 'Mobile Number' },
    { key: 'email', header: 'Email' },
    { 
      key: 'address', 
      header: 'Location',
      render: (_v, row) => (
        <span className="capitalize">{row.location_id_data?.name||"--"}</span>
      )
    },
    { key: 'fees_due_date', header: 'Fees Due Date',render: (_v, row) => (
       formatDate(row?.fees_due_date)
      )  },
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

function UserTable({ 
  users, 
  loading, 
  error, 
  onEdit,
  pagination = {},
  onPageChange,
  onRowsPerPageChange,
  page = 0,
  rowsPerPage = 10
}) {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [selectedRow, setSelectedRow] = React.useState(null);

  // Debug logging
  React.useEffect(() => {
    console.log('UserTable received users:', users);
    console.log('Users type:', typeof users);
    console.log('Users length:', users?.length);
    console.log('Users is array:', Array.isArray(users));
  }, [users]);

  const handleOpenMenu = (anchor, row) => {
    setMenuAnchor(anchor);
    setSelectedRow(row);
  };
  
  const handleClose = () => {
    setMenuAnchor(null);
  };
  
  const handleDetail = () => {
    if (selectedRow) {
      navigate(`/user/${selectedRow.user_id}`);
    }
    handleClose();
  };
  
  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
    }
    handleClose();
  };

  const columns = useColumns(handleOpenMenu, page, rowsPerPage);

  // Ensure users is always an array
  const safeUsers = Array.isArray(users) ? users : [];

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C82D30] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Users</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#C82D30] text-white px-4 py-2 rounded-md hover:bg-[#A02528]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!safeUsers || safeUsers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-600">Try adjusting your filters or add a new user.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Paper variant="outlined" sx={{ width: '100%', borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: 420 }}>
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key || col.header} sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {safeUsers.map((row, rowIndex) => (
                <TableRow hover key={row.user_id ?? JSON.stringify(row)}>
                  {columns.map((col) => (
                    <TableCell key={(col.key || col.header) + String(row.user_id ?? rowIndex)} className={col.className || ''}>
                      {col.render ? col.render(row[col.key], row, rowIndex) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={pagination?.total_items || 0}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        {/* <MenuItem onClick={handleEdit}>Edit</MenuItem> */}
      </Menu>
    </>
  );
}

export default UserTable;