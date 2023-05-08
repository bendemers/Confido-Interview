import React, { useState } from "react";
import { TextField, Button, Grid, Tabs, Tab, Box, Divider } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PriceChangeTable from "./PriceChangeTable";

const ProductForm = ({handleSubmit, newProduct, product}) => {

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [currency, setCurrency] = useState(product.currency);
    const [tabsValue, setTabsValue] = useState(0);
    const [changeDate, setChangeDate] = useState(dayjs());
    const [newPrice, setNewPrice] = useState("");
    const [upcomingChanges, setUpcomingChanges] = useState(product.changes.filter((change) => dayjs().isBefore(change.date)));
    const [pastChanges, setPastChanges] = useState(product.changes.filter((change) => !dayjs().isBefore(change.date)));

    const addPriceChange = () => {
      const newChange = {
        date: changeDate,
        price: newPrice,
        delta: newPrice - price,
      }
      upcomingChanges.push(newChange);
      setChangeDate(dayjs());
      setNewPrice("");
    }
    
    const tabChange = (event, newValue) => {
      setTabsValue(newValue);
    };

    const handleUpdate = () => {
      const updatedProduct = {
        name: name,
        price: price,
        currency: currency,
        changes: upcomingChanges.concat(pastChanges),
      }
      handleSubmit(updatedProduct);
    }

    return (
      <Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        >
        <Grid item>
          <h2>Modify Product</h2>
        </Grid>
        <Grid item xs>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </Grid>
        <Grid container item spacing={2}>
        <Grid item>
          <TextField
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              />
        </Grid>
          <Grid item>
              <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
          </Grid>
          
        </Grid>
        <Grid item>
          <h2> Price Changes </h2>
        </Grid>
        <Grid item>
          <Tabs value={tabsValue} onChange={tabChange}>
            <Tab label="Upcoming" />
            <Tab label="Past" />
          </Tabs>
          <Box sx={{minHeight: '200px'}}>
            {tabsValue === 0 && <Box><PriceChangeTable changes={upcomingChanges}/></Box>}
            {tabsValue === 1 && <Box><PriceChangeTable changes={pastChanges}/></Box>}
          </Box>
          
        </Grid>
        <Divider />
        <Grid item>
          <h2> Add Price Change </h2>
        </Grid>
        <Grid item container>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Price Change Date"
                inputFormat="MM/DD/YYYY"
                value={changeDate}
                onChange={setChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <TextField
                label="New Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
          </Grid>
        </Grid>
        <Grid item>
            <Button variant="outlined" fullWidth onClick={addPriceChange}>Add Price Change</Button>
          </Grid>
        <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          Submit
        </Button>
        </Grid>
        
              </Grid> 
    );

};

export default ProductForm;
