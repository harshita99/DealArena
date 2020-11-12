import React from 'react';
import './App.css';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </BrowserRouter>
    );
}

export default App;
