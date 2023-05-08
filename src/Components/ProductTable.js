import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';
import SearchBar from './SearchBar';




const ProductTable = ({openDrawer, products}) => {

    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(products);

    const requestSearch = (searchedVal) => {
        setSearch(searchedVal);
        const filteredRows = products.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
      };
    const cancelSearch = () => {
        setSearch("");
        requestSearch(search);
    };


  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    <SearchBar
        value={search}
        onSearch={requestSearch}
        onCancelSearch={() => cancelSearch()}
    />
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Modify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.date}</TableCell>
              <TableCell>
                <Button onClick={() => openDrawer(product.id)} variant="contained" color="primary">
                  Modify
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default ProductTable;
