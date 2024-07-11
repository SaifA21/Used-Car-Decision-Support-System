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

export default function SearchCard(prop) {
  return (
    <div>
      {prop.results.map((item, index) => (
      <Box sx={{ minWidth: 275 }}>
        <br />
        <CardContent>
          <Card>
          <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
            {item.Year} {item.Make} {item.Model}
          </Typography>
          

          <Grid container spacing={2} style={{justifyContent: 'center', display: 'flex'}}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" component="div">
                  {'$' + item.MSRP}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}> 
                <Card style={{marginBlock: '10px'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.Transmission} 
                    </Typography>
                </Card>
                <Card style={{marginBlock: '10px'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.Drivetrain}
                    </Typography>
                </Card>
                <Card style={{marginBlock: '10px'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.NumDoors}
                    </Typography>
                </Card>
                <Card style={{marginBlock: '10px'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.EngineHP}
                    </Typography>
                </Card>
                <Card style={{marginBlock: '10px'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.FuelType}
                    </Typography>
                </Card>
            </Grid>
          </Grid>

          
          <Typography variant="body2">
            City MPG:    {item.CityMPG}
            Highway MPG: {item.HighwayMPG}
            CombinedMPG: {item.CombinedMPG}
            <br />
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