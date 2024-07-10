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


function ViewHistory() {
  
  const [searchID, setSearchID] = React.useState()
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
    setResults([1,2,3,4,5])
    return body;
  
  }
  
  return (
    <div className='background'>
        <Navbar></Navbar>
        <div className='Title'>
            <Card style={{color: 'white', backgroundColor: '#4169e1', height: "auto"}} align="center">
            <Typography variant="h2" gutterBottom align="center">
                View Recommendation History
            </Typography> 
            </Card>
        </div>
       
        <div className='SelectOptions'>
            <Card style={{color: 'black', backgroundColor: 'white', height: "auto", width: "70%", borderRadius: "100px"}}>
            <Typography variant="h4" gutterBottom style={{marginTop: '2vh'}}>
                Search for your previous results by ID 
              </Typography> 
              <IntegerInput label="Enter Result ID" handle={setSearchID} selected={searchID}></IntegerInput>
              <Button variant='contained' onClick={() => {findResult()}} style={{backgroundColor: '#4169e1', color: 'white', width: '40vh', height: '5vh', marginBottom: '3vh'}}>Find Result</Button>
              <OutlinedCard></OutlinedCard>
        </Card>
        </div>
            
    </div>
  );
}

export default ViewHistory;
