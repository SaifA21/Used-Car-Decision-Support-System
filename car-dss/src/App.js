import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import * as React from 'react'
import { Navigate } from 'react-router-dom';
import Input from './Components/InputForm/Input';
import ViewHistory from './Components/HistoryResults/History';


function App() {
  
  return (
    <div>
    <Router>
        <Routes>
          <Route path="/page/search" Component={Input} />
          <Route path="/page/history" Component={ViewHistory} />
          <Route path="*" element={<Navigate replace to="/page/search" />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
