import React, { useState } from 'react';
import ProductTable from "./Components/ProductTable";
import { Box, Button, Typography, Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/theme';
import ActionDrawer from './Components/ActionDrawer';
import dayjs from 'dayjs';

function App() {

  const dummyProducts = [
    { id: 1, name: 'Product 1', price: 10,  changes: [{date: '2024-05-01', price: 20, delta: 10}, {date: '2025-05-01', price: 30, delta: 10}]},
    { id: 2, name: 'Product 2', price: 20,  changes: [] },
    { id: 3, name: 'Product 3', price: 30,  changes: [] },
  ];
  
  const [products, setProducts] = useState(dummyProducts);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openDrawer = (id) => {
    setDrawerOpen(true);
    setSelectedProduct(products.find((product) => product.id === id));
  }

  const onDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  }

  const addProduct = (product) => {
    const newProduct = product;
    newProduct.id = products.length + 1;
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    setDrawerOpen(false);
    setSelectedProduct(null);
  }

  const updateProduct = (product) => { 
    const productIdx = products.findIndex((p) => p.id === product.id);
    const updatedProducts = [...products];
    updatedProducts[productIdx] = product;
    setProducts(updatedProducts);
    setDrawerOpen(false);
    setSelectedProduct(null);
  }

  const createProduct = () => {
    setDrawerOpen(true);
    setSelectedProduct(null);
  }

  const findSoonestChange = (changes) => {
      return changes.filter((change) => dayjs(change.date).isAfter(dayjs())).sort((a, b) =>
      dayjs(a.date, 'h:mm A').isSameOrBefore(dayjs(b.date, 'h:mm A')) ? 1 : -1)[0];
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{background: '#ededed', height: '100vh', width: '100vw'}}>
        <Grid   
          sx={{ minWidth: '70vw'}}
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="baseline">
            <Grid item>
              <Typography variant="h4">Confido Product Dashboard</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={createProduct}>Add Product</Button>
            </Grid>
            <Grid item sx={{minWidth: '70vw'}}>  
              <ProductTable openDrawer={openDrawer} products={products}/>
            </Grid>
        </Grid>
        <ActionDrawer open={drawerOpen} onClose={onDrawerClose} addProduct={addProduct} product={selectedProduct} modifyProduct={updateProduct}  />
    </Box>
   </ThemeProvider>
  );
}

export default App;
