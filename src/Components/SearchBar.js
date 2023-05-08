import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props) => {
  return (
    <FormControl sx={{ m: 2, width: '30ch' }}>
      <OutlinedInput
        onChange={(e) => props.onSearch(e.target.value.toLowerCase())}
        value={props.value}
        startAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
        placeholder='Search Product Name'
      />
    </FormControl>
  );
};

export default SearchBar;