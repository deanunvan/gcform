import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BuyerProvider } from './context/BuyerContext';
import { SupplierProvider } from './context/SupplierContext';
import { Home } from './Components/Pages/Home';
import { Supform } from './Components/Pages/Supform';
import { Buyform } from './Components/Pages/Buyform';
import { Buyqn1 } from './Components/Pages/Buyqn1';
import { Buyqn2 } from './Components/Pages/Buyqn2';
import { Buyqn3 } from './Components/Pages/Buyqn3';
import { Buyqn4 } from './Components/Pages/Buyqn4';
import { Buyqn5 } from './Components/Pages/Buyqn5';
import { Buyqn6 } from './Components/Pages/Buyqn6';
import { Buyqn7 } from './Components/Pages/Buyqn7';
import { Supqn1 } from './Components/Pages/Supqn1';
import { Supqn2 } from './Components/Pages/Supqn2';
import { Supqn3 } from './Components/Pages/Supqn3';
import { Supqn4 } from './Components/Pages/Supqn4';
import { Supqn5 } from './Components/Pages/Supqn5';
import { Supqn6 } from './Components/Pages/Supqn6';
import { Supqn7 } from './Components/Pages/Supqn7';
import { ThankYou } from './Components/Pages/ThankYou';
import './App.css';
import "react-phone-input-2/lib/style.css";


function App() {
  return (
    <SupplierProvider>
      <BuyerProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/supform" element={<Supform/>} />
              <Route path="/buyform" element={<Buyform/>} />
              <Route path="/buyqn1" element={<Buyqn1/>} />
              <Route path="/buyqn2" element={<Buyqn2/>} />
              <Route path="/buyqn3" element={<Buyqn3/>} />
              <Route path="/buyqn4" element={<Buyqn4/>} />
              <Route path="/buyqn5" element={<Buyqn5/>} />
              <Route path="/buyqn6" element={<Buyqn6/>} />
              <Route path="/buyqn7" element={<Buyqn7/>} />
              <Route path="/supqn1" element={<Supqn1/>} />
              <Route path="/supqn2" element={<Supqn2/>} />
              <Route path="/supqn3" element={<Supqn3/>} />
              <Route path="/supqn4" element={<Supqn4/>} />
              <Route path="/supqn5" element={<Supqn5/>} />
              <Route path="/supqn6" element={<Supqn6/>} />
              <Route path="/supqn7" element={<Supqn7/>} />
              <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
          </div>
        </Router>
      </BuyerProvider>
    </SupplierProvider>
  );
}

export default App;




