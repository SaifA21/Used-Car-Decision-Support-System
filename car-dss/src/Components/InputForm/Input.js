import Slider from '../CarCountSlider';
import { Typography } from '@mui/material';
import {Card, CardActions, CardContent, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormLabel, RadioGroup, FormControlLabel, FormHelperText, CssBaseline} from "@mui/material";
import Multiselect from '../Multiselect'
import IntegerInput from '../IntegerInput'
import * as React from 'react'
import './Input.css'

function Input() {
  
  const [numberOfRecommendations, setNumberOfRecommendations] = React.useState()
  const [selectedDoors, setSelectedDoors] = React.useState([])
  const [selectedFuel, setselectedFuel] = React.useState([])
  const [selectedBody, setselectedBody] = React.useState([])
  const [selectedDrivetrain, setselectedDrivetrain] = React.useState([])
  const [selectedCylinders, setselectedCylinders] = React.useState([])
  const [selectedBudget, setselectedBudget] = React.useState([])
  const [selectedCarsize, setselectedCarsize] = React.useState([])
  const [selectedMake, setselectedMake] = React.useState([])
  const [selectedYear, setselectedYear] = React.useState([])
  const [selectedTrans, setselectedTrans] = React.useState([])
  const [cityMpg, setCityMpg] = React.useState()
  const [hwyMpg, setHwyMpg] = React.useState()

  const doors = ["two", "four"]
  const fuels = ["gas", "diesel"]
  const bodyStyles = ["convertible", "hatchback", "sedan", "wagon"]
  const drivetrain = ["fwd", "rwd", "4wd"]
  const cylinders = ["two", "three", "four", "five", "six", "eight"]
  const budgets = ["$5000-$10000", "$10000-$15000", "$15000-$20000", "$20000-$25000", "$25000-$30000", "$30000+"]
  const sizes = ["Smaller", "Medium", "Larger"]
  const make = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", 
    "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "FIAT", 
    "Ford", "Genesis", "GMC", "Honda", "HUMMER", "Hyundai", "Infiniti", "Kia", 
    "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", 
    "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mitsubishi", "Nissan", 
    "Oldsmobile", "Plymouth", "Pontiac", "Porsche", "Rolls-Royce", "Saab", 
    "Scion", "Spyker", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"
];  
    const year = [
  "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999",
  "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"
];  
    const trans = ["Automatic", "Manual"]



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
  
  return (
    <div className='background'>
      <div className='Title'>
              <Card style={{color: 'white', backgroundColor: '#4169e1', height: "auto"}} align="center">
              <Typography variant="h2" gutterBottom align="center">
                Decision Support System - Car Support
              </Typography> 
              </Card>

            </div>
            <div className='Slider' justifyContent='center'>
            <Card style={{color: 'black', backgroundColor: 'white', height: "auto", width: '70%', borderRadius: "100px"}}>
            <Typography variant="h4" gutterBottom style={{marginTop: '2vh'}}>
                How many cars should we recommend? 
              </Typography> 
              <Slider handle={setNumberOfRecommendations}></Slider>
              </Card>
            </div>
            <div className='SelectOptions'>
            <Card style={{color: 'black', backgroundColor: 'white', height: "auto", width: "70%", borderRadius: "100px"}}>
            <Typography variant="h4" gutterBottom style={{marginTop: '2vh'}}>
                What features do you want in your ride? 
              </Typography> 
            <Grid container direction="row" justifyContent="center" style={{marginBlock: '25px'}}>
            <Grid item xs={4}>
              <div>
              <Multiselect label="Number of Doors" options={doors} handle={setSelectedDoors} selected={selectedDoors}></Multiselect> 
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Fuel Type" options={fuels} handle={setselectedFuel} selected={selectedFuel}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Car Body Styles" options={bodyStyles} handle={setselectedBody} selected={selectedBody}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Drivetrain Type" options={drivetrain} handle={setselectedDrivetrain} selected={selectedDrivetrain}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Number of Cylinders" options={cylinders}handle={setselectedCylinders} selected={selectedCylinders}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Budget" options={budgets} handle={setselectedBudget} selected={selectedBudget}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Car Size" options={sizes} handle={setselectedCarsize} selected={selectedCarsize}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Year" options={year} handle={setselectedYear} selected={selectedYear}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Make" options={make} handle={setselectedMake} selected={selectedMake}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <Multiselect label="Transmission" options={trans} handle={setselectedTrans} selected={selectedTrans}></Multiselect>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <IntegerInput label="City MPG" handle={setCityMpg} selected={cityMpg}></IntegerInput>
              </div>              
              </Grid>
              <Grid item xs={4}>
              <div>
              <IntegerInput label="Highway MPG" handle={setHwyMpg} selected={hwyMpg}></IntegerInput>
              </div>              
              </Grid>
            </Grid>
            
            <Button variant='contained' onClick={() => {callApiTest()}} style={{backgroundColor: '#4169e1', color: 'white', width: '40vh', height: '5vh', marginBottom: '3vh'}}>Submit</Button>

            


            </Card>
            </div>
    </div>
  );
}

export default Input;
