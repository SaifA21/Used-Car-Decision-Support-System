import logo from './logo.svg';
import './App.css';
import Slider from './Components/CarCountSlider';
import { Typography } from '@mui/material';
import Dropdown from './Components/Dropdown';

function App() {
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Car DSS
      </Typography> 

      <Slider></Slider>

      <Dropdown></Dropdown>
    </div>
  );
}

export default App;
