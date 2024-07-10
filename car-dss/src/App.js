import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import * as React from 'react'
import { Navigate } from 'react-router-dom';
import Input from './Components/InputForm/Input';


function App() {
  
  return (
    <div>

    <Router>
        <Routes>
          <Route path="/Search" Component={Input} />
          <Route path="/History" Component={<p>View History</p>} />
          <Route path="*" element={<Navigate replace to="/Search" />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
