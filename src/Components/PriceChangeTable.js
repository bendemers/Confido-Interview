import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

const PriceChangeTable = ({changes}) => {
    const [rows, setRows] = useState(changes);
    if (changes.length === 0) {
        return <div><Typography variant='body1'>No Changes</Typography></div>;
    }
  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>New Price</TableCell>
            <TableCell>Price Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((change) => (
            <TableRow key={change.price}>
              <TableCell>{dayjs(change.date).format('DD/MM/YYYY').toString()}</TableCell>
              <TableCell>${change.price}</TableCell>
              <TableCell>${change.delta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default PriceChangeTable;
