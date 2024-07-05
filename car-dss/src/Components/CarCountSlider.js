import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


  function valuetext(value) {
    return `${value}°C`;
  }

export default function CarCountSlider() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
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
      />
    </Box>
  );
}