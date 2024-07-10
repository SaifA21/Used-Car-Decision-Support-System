import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


export default function IntegerInput(props) {

  return(
    <div>
        <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            onChange={(event)=>{props.handle(event.target.value)}}
          />
          <FormHelperText id="outlined-weight-helper-text">{props.label}</FormHelperText>
        </FormControl>
    </div>
  )
}