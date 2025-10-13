import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function CustomTable({
  columns,
  data,
  keyField = 'id',
  rowsPerPageOptions = [5, 10, 25],
  initialRowsPerPage = 10,
  stickyHeader = true,
  dense = false,
  containerSx,
  enablePagination = true,
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

  const start = page * rowsPerPage;
  const visibleRows = enablePagination && rowsPerPage > 0 ? data.slice(start, start + rowsPerPage) : data;

  return (
    <Paper variant="outlined" sx={{ width: '100%', borderRadius: 2 }}>
      <TableContainer sx={{ maxHeight: stickyHeader ? 420 : 'none', ...(containerSx || {}) }}>
        <Table stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow hover key={row[keyField] ?? JSON.stringify(row)}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
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
          count={data.length}
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


