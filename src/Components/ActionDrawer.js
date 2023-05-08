import React from 'react';
import {
  Drawer,
  IconButton,
} from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import NewProductForm from './NewProductForm';
import ModifyProductForm from './ModifyProductForm';

const ActionDrawer = ({ open, onClose, addProduct, product, modifyProduct }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width: '25%' } }}
    >
      <div>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        {product ? 
          (<ModifyProductForm modifyProduct={modifyProduct} product={product}/>) 
          : (<NewProductForm newProduct={false} createProduct={addProduct}/>)}
        
      </div>
      
    </Drawer>
  );
};

export default ActionDrawer;
