import React from 'react';
import './App.css';
import  Main  from './components/Main';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
          <Routes />
        </div>
      </BrowserRouter>
    );
}

export default App;
