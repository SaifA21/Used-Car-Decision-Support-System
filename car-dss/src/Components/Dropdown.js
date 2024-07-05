import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown() {
  const [make, setMake] = React.useState('Acura');

  const handleChange = (event) => {
    setMake(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Make</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={make}
          label="Make"
          onChange={handleChange}
        >
          <MenuItem value={10}>BMW</MenuItem>
          <MenuItem value={20}>Toyota</MenuItem>
          <MenuItem value={30}>Bentley</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}