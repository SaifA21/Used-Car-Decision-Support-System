import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


  function valuetext(value) {
    return `${value}°C`;
  }

export default function CarCountSlider(props) {
  
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      props.handle(newValue);
      console.log(newValue);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Small steps"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        marks
        min={1}
        max={5}
        valueLabelDisplay="auto"
        helperText="Number of Cars to Recommend"
        onChange={handleChange}
      />
    </Box>
    <FormHelperText id="outlined-weight-helper-text">Number of Cars to Recommend</FormHelperText>
    </FormControl>
  );
}