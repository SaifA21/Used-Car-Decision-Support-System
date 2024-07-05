import logo from './logo.svg';
import './App.css';
import Slider from './Components/CarCountSlider';
import { Typography } from '@mui/material';
import Dropdown from './Components/Dropdown';
import Multiselect from './Components/Multiselect'
import IntegerInput from './Components/IntegerInput'
import * as React from 'react'

function App() {
  const [selectedDoors, setselectedDoors] = React.useState("")
  const [selectedFuel, setselectedFuel] = React.useState("")
  const [selectedBody, setselectedBody] = React.useState("")
  const [selectedDrivetrain, setselectedDrivetrain] = React.useState("")
  const [selectedCylinders, setselectedCylinders] = React.useState("")
  const [selectedBudget, setselectedBudget] = React.useState("")
  const [selectedCarsize, setselectedCarsize] = React.useState("")
  const [cityMpg, setCityMpg] = React.useState("")
  const [hwyMpg, setHwyMpg] = React.useState("")

  const doors = ["two", "four"]
  const fuels = ["gas", "diesel"]
  const bodyStyles = ["convertible", "hatchback", "sedan", "wagon"]
  const drivetrain = ["fwd", "rwd", "4wd"]
  const cylinders = ["two", "three", "four", "five", "six", "eight"]
  const budgets = ["5000-10000", "10000-15000", "15000-20000", "20000-25000", "25000-30000", "30000+"]
  const sizes = ["Smaller", "Medium", "Larger"]
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Car DSS
      </Typography> 

      <Slider></Slider>

      <Multiselect label="Number of Doors" options={doors} handle={setselectedDoors}></Multiselect>
      <Multiselect label="Fuel Type" options={fuels} handle={setselectedFuel}></Multiselect>
      <Multiselect label="Car Body Styles" options={bodyStyles} handle={setselectedBody}></Multiselect>
      <Multiselect label="Drivetrain Type" options={drivetrain} handle={setselectedDrivetrain}></Multiselect>
      <Multiselect label="Number of Cylinders" options={cylinders}handle={setselectedCylinders}></Multiselect>
      <Multiselect label="Budget" options={budgets} handle={setselectedBudget}></Multiselect>
      <Multiselect label="Car Size" options={sizes} handle={setselectedCarsize}></Multiselect>
      <IntegerInput label="City MPG" handle={setCityMpg}></IntegerInput>
      <IntegerInput label="Highway MPG" handle={setHwyMpg}></IntegerInput>
      
      
    </div>
  );
}

export default App;
