import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


export default function DrivingSlider(props) {
  
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      props.handle(newValue);
      console.log(newValue);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
    <Box sx={{ width: 250 }}>
      <Slider
        aria-label="Percentage of Highway Driving"
        defaultValue={50}
        step={10}
        marks
        min={0}
        max={100}
        valueLabelDisplay="auto"
        helperText="Percentage of Highway Driving"
        onChange={handleChange}
      />
    </Box>
    <FormHelperText id="outlined-weight-helper-text">Percentage of Highway Driving</FormHelperText>
    </FormControl>
  );
}