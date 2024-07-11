import Slider from '../CarCountSlider';
import DrivingSlider from '../DrivingSlider';
import { Typography } from '@mui/material';
import { Card, Grid, Button } from "@mui/material";
import Multiselect from '../Multiselect'
import Dropdown from '../Dropdown'
import IntegerInput from '../IntegerInput'
import * as React from 'react'
import './Input.css'
import Navbar from '../Navbar';
import SearchCard from '../searchResults';
import OutlinedCard from '../resultCard';


function Input() {

  const [numberOfRecommendations, setNumberOfRecommendations] = React.useState()
  const [selectedFuel, setSelectedFuel] = React.useState([])
  const [selectedDrivetrain, setSelectedDrivetrain] = React.useState([])
  const [selectedHP, setSelectedHP] = React.useState("")
  const [selectedTimeHighway, setSelectedTimeHighway] = React.useState(0)
  const [desiredPrice, setDesiredPrice] = React.useState([])
  const [selectedYear, setSelectedYear] = React.useState("")
  const [selectedStyle, setSelectedStyle] = React.useState("")
  const [selectedMileage, setSelectedMileage] = React.useState([])
  const [selectedTrans, setSelectedTrans] = React.useState([])
  const [finalOutput, setFinalOutput] = React.useState([])




  const fuels = ["Gasoline", "Diesel", "Electric"]

  const drivetrain = ["front wheel drive", "rear wheel drive", "four wheel drive", "all wheel drive"]


  const vehicleStyle = ['Coupe', 'Convertible', 'Sedan', 'Wagon', '4dr Hatchback',
    '2dr Hatchback', '4dr SUV', 'Passenger Minivan', 'Cargo Minivan', 'Crew Cab Pickup',
    'Regular Cab Pickup', 'Extended Cab Pickup', '2dr SUV', 'Cargo Van', 'Passenger Van']

  const engineHP = [
    "Somewhat", "A decent amount", "Crucially"
  ];

  const year = [
    "1990-1995", "1996-2000", "2001-2005", "2006-2010", "2011-2015", "2016-2020"
  ];

  const goodMileage = ["Somewhat", "A decent amount", "Crucially"]

  const trans = ["Automatic", "Manual"]

  const apiPayload = {
    "MSRP": 0,
    "MPG": 0,
    "Number of Doors": 0,
    "Engine HP": 0,
    "Year": 0,
    "Highway Percent": 0,
    "Vehicle Size": 0,
    "Engine Fuel Type": [],
    "Transmission Type": [],
    "Driven Wheels": []
  };

  const mapUserInputToAPIPayload = async () => {
    if (selectedStyle[0] === "Coupe" || selectedStyle[0] === "Convertible"
      || selectedStyle[0] === "2dr Hatchback") {
      apiPayload['Vehicle Size'] = 1
      apiPayload['Number of Doors'] = 2
    }

    else if (selectedStyle[0] === "4dr Hatchback" || selectedStyle[0] === "Sedan" ||
      selectedStyle[0] === "Wagon") {
      apiPayload['Vehicle Size'] = 2
      apiPayload['Number of Doors'] = 4
    }

    else if (selectedStyle[0] === "Regular Cab Pickup" || selectedStyle[0] === "Extended Cab Pickup" ||
      selectedStyle[0] === "2dr SUV") {
      apiPayload['Vehicle Size'] = 2
      apiPayload['Number of Doors'] = 2
    }

    else if (selectedStyle[0] === "Crew Cab Pickup" || selectedStyle[0] === "4dr SUV" ||
      selectedStyle[0] === "Cargo Minivan" || selectedStyle[0] === "Passenger Minivan" ||
      selectedStyle[0] === "Passenger Van") {
      apiPayload['Vehicle Size'] = 3
      apiPayload['Number of Doors'] = 4
    }

    else {
      apiPayload['Vehicle Size'] = 3
      apiPayload['Number of Doors'] = 2
    }

    if (selectedMileage[0] === "Somewhat") {
      apiPayload['MPG'] = 20
    }

    else if (selectedMileage[0] === "A decent amount") {
      apiPayload['MPG'] = 23
    }
    else {
      apiPayload['MPG'] = 27
    }

    console.log(selectedMileage)

    if (selectedHP[0] === "Somewhat") {
      apiPayload['Engine HP'] = 150
    }
    else if (selectedHP[0] === "A decent amount") {
      apiPayload['Engine HP'] = 200
    }
    else {
      apiPayload['Engine HP'] = 250
    }


    if (selectedYear[0] === "1990-1995") {
      apiPayload['Year'] = 1993
    }
    else if (selectedYear[0] === "1996-2000") {
      apiPayload['Year'] = 1998
    }
    else if (selectedYear[0] === "2001-2005") {
      apiPayload['Year'] = 2003
    }
    else if (selectedYear[0] === "2006-2010") {
      apiPayload['Year'] = 2008
    }
    else if (selectedYear[0] === "2011-2015") {
      apiPayload['Year'] = 2013
    }
    else {
      apiPayload['Year'] = 2018
    }

    console.log(selectedHP)


    if (selectedFuel.includes("electric")) {
      apiPayload['Engine Fuel Type'].push("DIRECT_DRIVE")
    }

    apiPayload['Driven Wheels'].push(...selectedDrivetrain)
    apiPayload['Engine Fuel Type'].push(...selectedFuel)
    apiPayload['Transmission Type'].push(...selectedTrans)
    apiPayload['MSRP'] = desiredPrice
    apiPayload['Highway Percent'] = selectedTimeHighway / 100

    console.log(apiPayload)
  }


  const callPythonProcessAPI = async () => {


    const url = "/python/process";
    //const url = "/process";


    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiPayload) // Sending user data
      });

      if (!response.ok) {
        // If the response status code is not in the 200-299 range
        throw new Error('Network response was not ok');
      }

      const body = await response.json(); // Correctly awaiting the JSON body
      console.log("API response:", body);

      return body;
    } catch (error) {
      console.error("Error during API call:", error.message);
      throw error; // Rethrow or handle error as needed
    }

  }

  const handleSubmit = async () => {
    mapUserInputToAPIPayload()

    const output = await callPythonProcessAPI();

    const results = Object.entries(output).map(([key, value]) => ({
      id: key,
      Make: value[0],
      Model: value[1],
      Year: value[2],
      FuelType: value[3],
      EngineHP: value[4],
      Transmission: value[5],
      Drivetrain: value[6],
      NumDoors: value[7],
      HighwayMPG: value[9],
      CityMPG: value[10],
      MSRP: value[11],
      CombinedMPG: value[12]
    }))

    await setFinalOutput(results)
  }





  //callApiTest();

  return (
    <div className='background'>
      <div className='Title'>
        <Navbar></Navbar>
      </div>


      <div className='Slider' style={{ display: "flex", justifyContent: 'center', mb: 2 }}>
        <Card sx={{ color: 'black', backgroundColor: 'white', p: 3, width: '70%', borderRadius: "16px" }}>
          <Typography variant="h4" gutterBottom >
            How many cars should we recommend?
          </Typography>
          <Slider handle={setNumberOfRecommendations}></Slider>
        </Card>
      </div>

      <div className='SelectOptions' style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ color: 'black', backgroundColor: 'white', p: 3, width: "70%", borderRadius: "16px" }} align="center">
          <Typography variant="h4" gutterBottom style={{ marginTop: '2vh' }}>
            What features do you want in your ride?
          </Typography>

          <Grid container spacing={2} style={{ marginBlock: '25px' }}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                How much do you value having a newer car?
              </Typography>
              <Dropdown label="Year Range" options={year} handle={setSelectedYear} selected={selectedYear}></Dropdown>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                How valuable is a powerful engine in your vehicle?
              </Typography>
              <Dropdown label="HP" options={engineHP} handle={setSelectedHP} selected={selectedHP}></Dropdown>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                What is your preferred vehicle style?
              </Typography>
              <Dropdown label="Vehicle Style" options={vehicleStyle} handle={setSelectedStyle} selected={selectedStyle}></Dropdown>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                How much do you value good gas mileage in your car?
              </Typography>
              <Dropdown label="Good Mileage" options={goodMileage} handle={setSelectedMileage} selected={selectedMileage}></Dropdown>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                How much of your driving time as a percentage do you spend on the highway (not in city driving)?
              </Typography>
              <DrivingSlider handle={setSelectedTimeHighway}></DrivingSlider>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                What is the desired price you wish to spend?
              </Typography>
              <IntegerInput label="Desired Price Value" handle={setDesiredPrice} selected={desiredPrice}></IntegerInput>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                What type of wheel configuration do you prefer?
              </Typography>
              <Multiselect label="Drivetrain Type" options={drivetrain} handle={setSelectedDrivetrain} selected={selectedDrivetrain}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                What type of transmission type do you prefer?
              </Typography>
              <Multiselect label="Transmission Type" options={trans} handle={setSelectedTrans} selected={selectedTrans}></Multiselect>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom style={{ marginTop: '2vh' }}>
                What type of fuel type would you like your car to have?
              </Typography>
              <Multiselect label="Fuel Type" options={fuels} handle={setSelectedFuel} selected={selectedFuel}></Multiselect>
            </Grid>
          </Grid>

          <Button variant='contained'
            onClick={() => { handleSubmit() }}
            style={{
              backgroundColor: '#4169e1',
              color: 'white', width: '250px', height: '5vh',
              marginBottom: '3vh'
            }}>
            Submit
          </Button>
        </Card>
      </div>
      <div className='Submit' style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ color: 'black', backgroundColor: 'white', p: 3, width: "70%", borderRadius: "16px" }} align="center">
          <Typography variant="h4" gutterBottom style={{ marginTop: '2vh' }}>
            These are the cars we believe suit you best!
          </Typography>
          <SearchCard results={finalOutput}></SearchCard>
        </Card>
      </div>
    </div>
  );
}

export default Input;
