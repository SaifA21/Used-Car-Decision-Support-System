import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@mui/material";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const savePurchase = async () => {

  const url = "/api/test";
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify()
  
  });
  const body = await response.json;
  
  if (response.status !== 200) throw Error(body.message);
  
  return body;
}

export default function OutlinedCard(prop) {
  return (
    <div>
      {prop.results.map((item, index) => (
      <Box sx={{ minWidth: 275 }}>
        <br />
        <CardContent>
          <Card>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            {item}
          </Typography>
          <CardActions style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button onClick={() => {savePurchase()}} size="small" variant='contained' style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>Purchased</Button>
        </CardActions>
        </Card>
        </CardContent>
      </Box>
    ))}
    </div>
  );
}