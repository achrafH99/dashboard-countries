import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetail from './pages/CountryDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/country/:name' element={<CountryDetail/>} />
      </Routes>
    </Router>
    // <div className="App">
    //         <Home />
    // </div>
  );
}

export default App;
