import Slider from '../CarCountSlider';
import DrivingSlider from '../DrivingSlider';
import { Typography } from '@mui/material';
import {Card, Grid, Button} from "@mui/material";
import Multiselect from '../Multiselect'
import Dropdown from '../Dropdown'
import IntegerInput from '../IntegerInput'
import * as React from 'react'
import './Input.css'
import Navbar from '../Navbar';

function Input() {
  
  const [numberOfRecommendations, setNumberOfRecommendations] = React.useState()
  const [selectedDoors, setSelectedDoors] = React.useState([])
  const [selectedFuel, setSelectedFuel] = React.useState([])
  const [selectedBody, setSelectedBody] = React.useState([])
  const [selectedDrivetrain, setSelectedDrivetrain] = React.useState([])
  const [selectedHP, setSelectedHP] = React.useState([])
  const [selectedTimeHighway, setSelectedTimeHighway] = React.useState([])
  const [selectedCarsize, setSelectedCarsize] = React.useState([])
  const [desiredPrice, setDesiredPrice] = React.useState([])
  const [selectedYear, setSelectedYear] = React.useState([])
  const [selectedStyle, setSelectedStyle] = React.useState([])
  const [selectedMileage, setSelectedMileage] = React.useState([])
  const [selectedTrans, setSelectedTrans] = React.useState([])
  const [cityMpg, setCityMpg] = React.useState()
  const [hwyMpg, setHwyMpg] = React.useState()

  const doors = ["two", "four"]
  const fuels = ["gas", "diesel"]
  const bodyStyles = ["convertible", "hatchback", "sedan", "wagon"]
  const drivetrain = ["fwd", "rwd", "4wd"]
  const cylinders = ["two", "three", "four", "five", "six", "eight"]
  const budgets = ["$5000-$10000", "$10000-$15000", "$15000-$20000", "$20000-$25000", "$25000-$30000", "$30000+"]
  
  const vehicleStyle = ['Coupe', 'Convertible', 'Sedan', 'Wagon', '4dr Hatchback', '2dr Hatchback',
  '4dr SUV', 'Passenger Minivan', 'Cargo Minivan', 'Crew Cab Pickup',
  'Regular Cab Pickup', 'Extended Cab Pickup', '2dr SUV', 'Cargo Van',
  'Convertible SUV', 'Passenger Van']
  const engineHP = [
    "Not at all", "Somewhat", "A decent amount", "Crucially"
  ];  
  const year = [
    "1990-1995", "1996-2000", "2001-2005", "2006-2010", "2011-2015", "2016-2020"
  ];  
  const goodMileage = ["Not at all", "Somewhat", "A decent amount", "Crucially"]

  
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
        <Navbar></Navbar>
      </div>

          
      <div className='Slider' style={{display: "flex", justifyContent: 'center', mb:2}}>
        <Card sx={{color: 'black', backgroundColor: 'white', p: 3, width: '70%', borderRadius: "16px"}}>
          <Typography variant="h4" gutterBottom >
            How many cars should we recommend? 
          </Typography> 
          <Slider handle={setNumberOfRecommendations}></Slider>
        </Card>
      </div>
      
      <div className='SelectOptions' style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{color: 'black', backgroundColor: 'white', p: 3, width: "70%", borderRadius: "16px"}} align="center">
          <Typography variant="h4" gutterBottom style={{marginTop: '2vh'}}>
            What features do you want in your ride? 
          </Typography> 

          <Grid container spacing={2} style={{ marginBlock: '25px' }}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                How much do you value having a newer car?
                </Typography>
                <Dropdown label="Year Range" options={year} handle={setSelectedYear} selected={selectedYear}></Dropdown>              
            </Grid>
          
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                How valuable is a powerful engine in your vehicle?
                </Typography>
                <Dropdown label="HP" options={engineHP} handle={setSelectedHP} selected={selectedHP}></Dropdown>              
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                What is your preferred vehicle style?
                </Typography>
                <Dropdown label="Vehicle Style" options={vehicleStyle} handle={setSelectedStyle} selected={selectedStyle}></Dropdown>              
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                How much do you value good gas mileage in your car?
                </Typography>
                <Dropdown label="Good Mileage" options={goodMileage} handle={setSelectedMileage} selected={selectedMileage}></Dropdown>              
            </Grid>
          
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                How much of your driving time as a percentage do you spend on the highway (not in city driving)?
                </Typography>
                <DrivingSlider handle={setSelectedTimeHighway}></DrivingSlider>
            </Grid>
          
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                What is the desired price you wish to spend?
                </Typography>
                <IntegerInput label="Desired Price Value" handle={setDesiredPrice} selected={desiredPrice}></IntegerInput>    
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                What type of wheel configuration do you prefer?
                </Typography>
                <Multiselect label="Drivetrain Type" options={drivetrain} handle={setSelectedDrivetrain} selected={selectedDrivetrain}></Multiselect>              
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                What type of transmission type do you prefer?
                </Typography>
                <Multiselect label="Transmission Type" options={trans} handle={setSelectedTrans} selected={selectedTrans}></Multiselect>              
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h6" gutterBottom style={{marginTop: '2vh'}}>
                What type of fuel type would you like your car to have?
                </Typography>
                <Multiselect label="Fuel Type" options={fuels} handle={setSelectedFuel} selected={selectedFuel}></Multiselect>              
            </Grid>
          </Grid>

          <Button variant='contained' 
            onClick={() => {callApiTest()}} 
            style={{backgroundColor: '#4169e1', 
            color: 'white', width: '250px', height: '5vh', 
            marginBottom: '3vh'}}>
              Submit
          </Button>
        </Card>
      </div>
      <div className='Submit' style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{color: 'black', backgroundColor: 'white', p: 3, width: "70%", borderRadius: "16px"}} align="center">
        <Typography variant="h4" gutterBottom style={{marginTop: '2vh'}}>
            These are the cars we believe suit you best!
          </Typography> 
        </Card>
        </div>
    </div>
  );
}

export default Input;
