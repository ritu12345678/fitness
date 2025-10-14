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
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowsPerPage);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowData = Array.isArray(rows) ? rows : (Array.isArray(data) ? data : []);

  const start = page * rowsPerPage;
  const visibleRows = enablePagination && rowsPerPage > 0 ? rowData.slice(start, start + rowsPerPage) : rowData;

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
                      : (col.render ? col.render(row[col.key], row) : row[col.key])}
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
          count={rowData.length}
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

