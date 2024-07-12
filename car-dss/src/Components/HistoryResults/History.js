import Slider from '../CarCountSlider';
import { Typography } from '@mui/material';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@mui/material";
import Multiselect from '../Multiselect'
import IntegerInput from '../IntegerInput'
import OutlinedCard from '../resultCard';
import * as React from 'react'
import './History.css'
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import Navbar from '../Navbar';


export default function ViewHistory() {
  
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


  const callApiTest = async () => {

    const url = "/api/searchResultsAll";
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

//  callApiTest();

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
  }
  
  return (
    <div className='background'>
        <Navbar></Navbar>
       
        <div className='SelectOptions'>
          <Card style={{color: 'black', backgroundColor: 'white', height: "auto", width: "70%", borderRadius: "16px"}}>
            <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
              Search for your previous results and let us know whether you purchased from a recommendation
            </Typography> 
            
            <IntegerInput label="Enter Result ID" handle={setSearchID} selected={searchID}></IntegerInput>
            
            <Button variant='contained' onClick={() => {loadUpdates()}} style={{backgroundColor: '#4169e1', color: 'white', width: '40vh', height: '5vh', marginBottom: '3vh'}}>Find Result</Button>
            
            <CardContent>
              <Card>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Your Search Parameters Were:
                </Typography>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                  Preferred Car Body Style : {searchParameter.vehicleStyle} <br></br>
                  Preferred Drive Trains: {searchParameter.drivetrainSelections}<br></br>
                  Preffered Fuel Types: {searchParameter.fuelTypes}<br></br>
                  Number of Result to View: {searchParameter.numCarsSelected}<br></br>
                  Preferred Year Range of Car: {searchParameter.yearRange}<br></br>
                  Level of concern for higher horsepower: {searchParameter.hpScale}<br></br>
                  Level of Concern for better fuel mileage: {searchParameter.mileageScale}<br></br>
                  Estimated Percentage of Driving Time on Highway: {searchParameter.hwyPercentage}<br></br>
                  Preferred Transmission Types: {searchParameter.transmissionTypes}<br></br>
                </Typography>
              </Card>
            </CardContent>

            <OutlinedCard searchID={searchID} results={results}></OutlinedCard>
          </Card>
        </div>
            
    </div>
  );
}