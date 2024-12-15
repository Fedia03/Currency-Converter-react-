import './App.css';
import Header from "./Header/js/Header.js"
import Navigation_menu from './Navigation_menu/js/Navigation_menu.js';
import CurrencyRates from './Currency_rates/js/Currency_rates.js';
import Login from './Login/js/Login.js';
import Sign_up from './Sign_up/js/Sign_up.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CurrencyConverter from './Currency_converter/js/Currency_converter.js'


const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation_menu />
        <Routes>
        <Route path='main_content' Component={CurrencyConverter} />
        <Route path='login' Component={Login} />
        <Route path='signup' Component={Sign_up} />
        <Route path='exchange_rates' Component={CurrencyRates} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
