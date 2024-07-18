import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline } from "@mui/material";
import Pricetag from "../Images/Pricetag.png"

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function roundToDecimalPlaces(num, decimalPlaces) {
  return Number(num.toFixed(decimalPlaces));
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export default function SearchCard(props) {
  return (
    <div>

      {props.results.length > 0 ? <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: '#4BB543', borderRadius: '30px' }}>
        <Typography style={{ fontSize: 25, marginBlock: '8px' }} color="white">
          Great News! Your Results Have Been Saved on the History Page. <br /> <b>Result ID: {props.id}</b>
        </Typography>
      </Card> : ''}


      {props.results.map((item, index) => (
        <Box sx={{ minWidth: 275 }}>
          <br />
          <CardContent>
            <Card style={{ backgroundColor: "#187DCE", borderRadius: "30px" }}>
              <Typography sx={{ fontSize: 45 }} color="white" gutterBottom>
                {item.Year} {item.Make} {item.Model}
              </Typography>


              <Grid container spacing={2} style={{ justifyContent: 'center', display: 'flex' }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h4" component="div" color="white">
                    <img src={Pricetag} alt="Logo" width="36" />
                    {'   Price: ' + formatter.format(item.MSRP)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Transmission Type
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.Transmission}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Drivetrain Type
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.Drivetrain}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Number of Doors
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.NumDoors}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Engine Horsepower
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.EngineHP}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Fuel Type
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '40px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.FuelType}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      City MPG
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '40px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.CityMPG}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Highway MPG
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '40px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {item.HighwayMPG}
                    </Typography>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px', backgroundColor: 'black' }}>
                    <Typography style={{ fontSize: 25 }} color="white">
                      Combined MPG
                    </Typography>
                  </Card>
                  <Card style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '40px' }}>
                    <Typography sx={{ marginBlock: 1.5 }} color="text.secondary">
                      {roundToDecimalPlaces(item.CombinedMPG, 2)}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <CardActions style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              </CardActions>
            </Card>
          </CardContent>
        </Box>
      ))}
    </div>
  );
}