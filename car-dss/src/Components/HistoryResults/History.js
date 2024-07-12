import { Typography } from '@mui/material';
import { Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline } from "@mui/material";
import IntegerInput from '../IntegerInput'
import OutlinedCard from '../resultCard';
import * as React from 'react'
import './History.css'
import Navbar from '../Navbar';


export default function ViewHistory() {

  const [loaded, setLoaded] = React.useState(false);
  const [searchID, setSearchID] = React.useState()
  const [searchParameter, setSearchParameter] = React.useState({
    'numCarsSelected': '',
    'yearRange': '',
    'hpScale': '',
    'vehicleStyle': '',
    'mileageScale': '',
    'hwyPercentage': '',
    'drivetrainSelections': '',
    'transmissionTypes': '',
    'fuelTypes': ''
  })
  const [results, setResults] = React.useState([])
  const [purchased, setPurchased] = React.useState(false)

  const findResult = async () => {
    console.log(searchID)
    const url = "/api/searchResultById";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: searchID })

    });
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;

  }

  const loadUpdates = () => {
    setPurchased(false)

    findResult()
      .then(res => {
        var parsed = JSON.parse(res.express);
        var results = [([parsed[0].car1Result][0]), ([parsed[0].car2Result][0]), ([parsed[0].car3Result][0]), ([parsed[0].car4Result][0]), ([parsed[0].car5Result][0])]
        console.log(results)
        var searchParameters = {
          'numCarsSelected': parsed[0].numCarsSelected,
          'yearRange': parsed[0].yearRange,
          'hpScale': parsed[0].hpScale,
          'vehicleStyle': parsed[0].vehicleStyle,
          'mileageScale': parsed[0].mileageScale,
          'hwyPercentage': parsed[0].hwyPercentage,
          'drivetrainSelections': parsed[0].drivetrainSelections,
          'transmissionTypes': parsed[0].transmissionTypes,
          'fuelTypes': parsed[0].fuelTypes
        }
        console.log(parsed[0])
        console.log(searchParameters)
        setSearchParameter(searchParameters)
        setResults(results)
      }
      )

    setLoaded(true)
  }

  return (
    <div className='background'>
      <Navbar></Navbar>

      <div className='SelectOptions'>
        <Card sx={{ color: 'black', backgroundColor: 'white', p: 3, width: '70%', borderRadius: "16px" }}>

          <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
            Search for your previous results and let us know whether you purchased from a recommendation!
          </Typography>

          <Grid container justifyContent='center' spacing={2} style={{ marginBlock: '25px' }} >

            <Grid item xs={12} sm={12} md={12}>
              <IntegerInput label="Enter Result ID" handle={setSearchID} selected={searchID}></IntegerInput>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Button
                variant='contained'
                onClick={loadUpdates}
                style={{ backgroundColor: '#4169e1', color: 'white', width: '100%', height: '5vh' }}
              >
                Find Result
              </Button>
            </Grid>

            {loaded &&
              <Grid item xs={12} sm={12} md={12}>
                <CardContent>
                  <Card sx={{ outline: '3px solid #f0f0f0' }}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Your Search Parameters Were:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      <b> Preferred Drivetrain:</b> {searchParameter.drivetrainSelections} <br />
                      <b>Preferred Fuel Types:</b> {searchParameter.fuelTypes} <br />
                      <b>Number of Results to View:</b> {searchParameter.numCarsSelected} <br />
                      <b>Preferred Year Range of Car:</b> {searchParameter.yearRange} <br />
                      <b>Level of concern for higher horsepower:</b> {searchParameter.hpScale} <br />
                      <b>Level of Concern for better fuel mileage:</b> {searchParameter.mileageScale} <br />
                      <b>Estimated Percentage of Driving Time on Highway:</b> {searchParameter.hwyPercentage} <br />
                      <b>Preferred Transmission Types:</b> {searchParameter.transmissionTypes} <br />
                    </Typography>
                  </Card>
                </CardContent>
              </Grid>
            }

            <Grid item xs={12} sm={12} md={6}>
              <OutlinedCard setPurchased={setPurchased} purchased={purchased} searchID={searchID} results={results}></OutlinedCard>
            </Grid>

          </Grid>
        </Card>
      </div>

    </div>
  );
}