import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.Year} {item.Make} {item.Model}
          </Typography>
          <Typography variant="h5" component="div">
            {item.MSRP}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.Transmission} {item.Driven_Wheels} {item.Number_of_Doors} {item.Vehicle_Style}
          </Typography>
          <Typography variant="body2">
            City MPG:    {item.city_mpg}
            Highway MPG: {item.highway_MPG}
            <br />
          </Typography>
        </CardContent>
        <CardActions style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button onClick={() => {savePurchase()}} size="small" variant='contained' style={{textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center'}}>Purchased</Button>
        </CardActions>
      </Box>
    ))}
    </div>
  );
}