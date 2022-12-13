import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Car } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'make' | 'model' | 'package' | 'color' | 'year' | 'category' | 'mileage' | 'price' | 'id';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
  format?: (value?: number | string) => string;
}

const columns: readonly Column[] = [
  { id: 'make', label: 'Make', minWidth: 170 },
  { id: 'model', label: 'Model', minWidth: 100 },
  {
    id: 'package',
    label: 'Package',
    minWidth: 170,
    align: 'right',
    format: (value?: number | string) => String(value),
  },
  {
    id: 'color',
    label: 'Color',
    minWidth: 170,
    align: 'right',
    format: (value?: number | string) => String(value),
  },
  {
    id: 'year',
    label: 'Year',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'mileage',
    label: 'Mileage (mi)',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Price (cents)',
    minWidth: 170,
    align: 'right',
    format: (value?: number | string) => String(Number(value) * 100)
  },
  {
    id: 'id',
    label: 'ID',
    minWidth: 170,
    align: 'left',
  },
];


interface CustomTableProps {
    data: Car[] | null
}

export default function CustomTable({data}: CustomTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const sortedRows = data?.sort(function(a,b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const returnCellValue = (value?: string | number | null) => value ? value : '- -'

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows && sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <TableRow style={{cursor: 'pointer' }} hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => navigate(`/car-info/${row.id}`)}>
                        {columns.map((column) => {
                        const value = row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format
                                ? column.format(value)
                                : returnCellValue(value)}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sortedRows ? sortedRows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}