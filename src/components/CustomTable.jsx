import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Unified CustomTable that supports both simple and MUI-driven usages.
// Backward compatible props: accepts either `rows` or `data` for row data.
function CustomTable({
  title,
  actionText = 'See Detail',
  onActionClick,
  columns = [],
  rows, // preferred
  data, // backward-compat alias
  keyField = 'id',
  rowsPerPageOptions = [5, 10, 25],
  initialRowsPerPage = 10,
  stickyHeader = true,
  dense = false,
  containerSx,
  enablePagination = true,
  renderCell,
  // Server-side pagination props
  page: externalPage,
  rowsPerPage: externalRowsPerPage,
  onPageChange: externalOnPageChange,
  onRowsPerPageChange: externalOnRowsPerPageChange,
  count: externalCount,
}) {
  // Use external pagination state if provided (server-side), otherwise use internal state (client-side)
  const isServerSide = externalPage !== undefined;
  const [internalPage, setInternalPage] = React.useState(0);
  const [internalRowsPerPage, setInternalRowsPerPage] = React.useState(initialRowsPerPage);
  
  const page = isServerSide ? externalPage : internalPage;
  const rowsPerPage = isServerSide ? externalRowsPerPage : internalRowsPerPage;

  const handleChangePage = (event, newPage) => {
    if (isServerSide && externalOnPageChange) {
      externalOnPageChange(event, newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (isServerSide && externalOnRowsPerPageChange) {
      externalOnRowsPerPageChange(event);
    } else {
      setInternalRowsPerPage(newRowsPerPage);
      setInternalPage(0);
    }
  };

  const rowData = Array.isArray(rows) ? rows : (Array.isArray(data) ? data : []);

  // For server-side pagination, don't slice - use data as-is
  // For client-side pagination, slice the data
  const visibleRows = (isServerSide || !enablePagination) 
    ? rowData 
    : (rowsPerPage > 0 ? rowData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rowData);
  
  // Use external count for server-side pagination, otherwise use data length
  const paginationCount = isServerSide && externalCount !== undefined ? externalCount : rowData.length;

  return (
    <Paper variant="outlined" sx={{ width: '100%', borderRadius: 2 }}>
      {(title || onActionClick) && (
        <div className="flex items-center justify-between px-4 pt-3">
          <p className="font-medium text-gray-900">{title}</p>
          {onActionClick && (
            <button onClick={onActionClick} className="text-xs text-gray-600 hover:text-gray-900">
              {actionText}
            </button>
          )}
        </div>
      )}
      <TableContainer sx={{ maxHeight: stickyHeader ? 420 : 'none', ...(containerSx || {}) }}>
        <Table stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
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
            {visibleRows.map((row, rowIndex) => (
              <TableRow hover key={row[keyField] ?? JSON.stringify(row)}>
                {columns.map((col) => (
                  <TableCell key={(col.key || col.header) + String(row[keyField] ?? rowIndex)} className={col.className || ''}>
                    {renderCell
                      ? renderCell({ row, col, value: row[col.key], rowIndex })
                      : (col.render ? col.render(row[col.key], row, rowIndex) : row[col.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {enablePagination && (
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={paginationCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default CustomTable;

