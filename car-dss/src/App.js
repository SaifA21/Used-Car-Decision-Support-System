import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import * as React from 'react'
import Input from './Components/InputForm/Input';

function App() {
  
  return (
    <div>

    <Router>
        <Routes>
          <Route path="/" Component={Input} />
          <Route path="*" element={<p>Path not resolved</p>} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
