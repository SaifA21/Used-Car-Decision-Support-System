import Slider from '../CarCountSlider';
import { Typography } from '@mui/material';
import {Card, Grid, Button} from "@mui/material";
import Multiselect from '../Multiselect'
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
  const [selectedCylinders, setSelectedCylinders] = React.useState([])
  const [selectedBudget, setSelectedBudget] = React.useState([])
  const [selectedCarsize, setSelectedCarsize] = React.useState([])
  const [selectedMake, setSelectedMake] = React.useState([])
  const [selectedYear, setSelectedYear] = React.useState([])
  const [selectedTrans, setSelectedTrans] = React.useState([])
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
            <Grid item xs={12} sm={6} md={4}>
                <Multiselect label="Number of Doors" options={doors} handle={setSelectedDoors} selected={selectedDoors}></Multiselect>              
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Fuel Type" options={fuels} handle={setSelectedFuel} selected={selectedFuel}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Car Body Styles" options={bodyStyles} handle={setSelectedBody} selected={selectedBody}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Drivetrain Type" options={drivetrain} handle={setSelectedDrivetrain} selected={selectedDrivetrain}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Number of Cylinders" options={cylinders}handle={setSelectedCylinders} selected={selectedCylinders}></Multiselect>            
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Budget" options={budgets} handle={setSelectedBudget} selected={selectedBudget}></Multiselect>            
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Car Size" options={sizes} handle={setSelectedCarsize} selected={selectedCarsize}></Multiselect>           
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Year" options={year} handle={setSelectedYear} selected={selectedYear}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Make" options={make} handle={setSelectedMake} selected={selectedMake}></Multiselect>           
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Multiselect label="Transmission" options={trans} handle={setSelectedTrans} selected={selectedTrans}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <IntegerInput label="City MPG" handle={setCityMpg} selected={cityMpg}></IntegerInput>          
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <IntegerInput label="Highway MPG" handle={setHwyMpg} selected={hwyMpg}></IntegerInput>            
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
    </div>
  );
}

export default Input;
