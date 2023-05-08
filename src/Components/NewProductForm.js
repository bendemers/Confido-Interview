import React, { useState } from "react";
import { TextField, Button, Grid, Tabs, Tab, Box, Divider } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PriceChangeTable from "./PriceChangeTable";

const NewProductForm = ({createProduct}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [tabsValue, setTabsValue] = useState(0);
    const [changeDate, setChangeDate] = useState(dayjs());
    const [newPrice, setNewPrice] = useState("");
    const [upcomingChanges, setUpcomingChanges] = useState([]);
    const [pastChanges, setPastChanges] = useState([]);

    const addPriceChange = () => {
      const newChange = {
        date: changeDate,
        price: newPrice,
        delta: newPrice - price,
      }
      upcomingChanges.push(newChange);
      setUpcomingChanges(upcomingChanges);
      setChangeDate(dayjs());
      setNewPrice("");
    }

    
    const tabChange = (event, newValue) => {
      setTabsValue(newValue);
    };

    const handleSubmit = () => {
      const newProduct = {
        name: name,
        price: price,
        currency: currency,
        changes: upcomingChanges.concat(pastChanges),
      }
      createProduct(newProduct);
    }

    return (
      <Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        >
        <Grid item>
          <h2>Add Product</h2>
          
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
                inputForma  t="MM/DD/YYYY"
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
            <Button variant="outlined"  onClick={addPriceChange} fullWidth>Add Price Change</Button>
          </Grid>
        <Grid item>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        </Grid>
      </Grid> 
    );

};

export default NewProductForm;
