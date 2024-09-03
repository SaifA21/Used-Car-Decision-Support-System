import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


export default function CarCountSlider(props) {

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      props.handle(newValue);
      console.log(newValue);
    }
  };

  return (
    <FormControl sx={{ m: 1, minwidth: '25ch' }} variant="outlined" fullWidth>
      <Box sx={{ minwidth: 250 }}>
        <Slider
          aria-label="Number of cars to recommend"
          defaultValue={5}
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