import logo from './logo.svg';
import './App.css';
import Weather from './Weather';
import AnotherCity from './AnotherCity';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (


    <Router>
      <Routes>
        <Route exact path='/' element={<Weather/>}></Route>
        <Route path='/another-city' element={<AnotherCity/>}></Route>
      </Routes>
    </Router>


  
  );
}

export default App;
