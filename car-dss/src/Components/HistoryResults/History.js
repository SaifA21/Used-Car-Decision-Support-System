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
    'carBodyStylesSelected': '',
    'carSizeSelected': '',
    'cityMPG': '',
    'driveTrainSelected': '',
    'fuelTypeSelected': '',
    'hwyMPG': '',
    'id': '',
    'numCarsSelected': '',
    'numDoorsSelected': '',
    'numOfCylindersSelected': ''
  })
  const [results, setResults] = React.useState([])


  const callApiTest = async () => {

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

  //callApiTest();

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
          'carBodyStylesSelected': parsed[0].carBodyStylesSelected,
          'carSizeSelected': parsed[0].carSizeSelected,
          'cityMPG': parsed[0].cityMPG,
          'driveTrainSelected': parsed[0].driveTrainSelected,
          'fuelTypeSelected': parsed[0].fuelTypeSelected,
          'hwyMPG': parsed[0].hwyMPG,
          'id': parsed[0].id,
          'numCarsSelected': parsed[0].numCarsSelected,
          'numDoorsSelected': parsed[0].numDoorsSelected,
          'numOfCylindersSelected': parsed[0].numOfCylindersSelected
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
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Your Search Parameters Were:
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                  Car Body Style : {searchParameter.carBodyStylesSelected}
                </Typography>
              </Card>
            </CardContent>

            <OutlinedCard results={results}></OutlinedCard>
          </Card>
        </div>
            
    </div>
  );
}