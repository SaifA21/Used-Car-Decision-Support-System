import Slider from '../CarCountSlider';
import { Typography } from '@mui/material';
import Multiselect from '../Multiselect'
import IntegerInput from '../IntegerInput'
import * as React from 'react'

function Input() {
  
  const [numberOfRecommendations, setNumberOfRecommendations] = React.useState()
  const [selectedDoors, setSelectedDoors] = React.useState([])
  const [selectedFuel, setselectedFuel] = React.useState([])
  const [selectedBody, setselectedBody] = React.useState([])
  const [selectedDrivetrain, setselectedDrivetrain] = React.useState([])
  const [selectedCylinders, setselectedCylinders] = React.useState([])
  const [selectedBudget, setselectedBudget] = React.useState([])
  const [selectedCarsize, setselectedCarsize] = React.useState([])
  const [cityMpg, setCityMpg] = React.useState()
  const [hwyMpg, setHwyMpg] = React.useState()

  const doors = ["two", "four"]
  const fuels = ["gas", "diesel"]
  const bodyStyles = ["convertible", "hatchback", "sedan", "wagon"]
  const drivetrain = ["fwd", "rwd", "4wd"]
  const cylinders = ["two", "three", "four", "five", "six", "eight"]
  const budgets = ["5000-10000", "10000-15000", "15000-20000", "20000-25000", "25000-30000", "30000+"]
  const sizes = ["Smaller", "Medium", "Larger"]

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

  callApiTest();
  
  return (
    <div>

      <Typography variant="h4" gutterBottom>
        Car DSS
      </Typography> 

      <Slider handle={setNumberOfRecommendations}></Slider>

      <Multiselect label="Number of Doors" options={doors} handle={setSelectedDoors} selected={selectedDoors}></Multiselect>
      <Multiselect label="Fuel Type" options={fuels} handle={setselectedFuel} selected={selectedFuel}></Multiselect>
      <Multiselect label="Car Body Styles" options={bodyStyles} handle={setselectedBody} selected={selectedBody}></Multiselect>
      <Multiselect label="Drivetrain Type" options={drivetrain} handle={setselectedDrivetrain} selected={selectedDrivetrain}></Multiselect>
      <Multiselect label="Number of Cylinders" options={cylinders}handle={setselectedCylinders} selected={selectedCylinders}></Multiselect>
      <Multiselect label="Budget" options={budgets} handle={setselectedBudget} selected={selectedBudget}></Multiselect>
      <Multiselect label="Car Size" options={sizes} handle={setselectedCarsize} selected={selectedCarsize}></Multiselect>
      <IntegerInput label="City MPG" handle={setCityMpg} selected={cityMpg}></IntegerInput>
      <IntegerInput label="Highway MPG" handle={setHwyMpg} selected={hwyMpg}></IntegerInput>
      
      
    </div>
  );
}

export default Input;
