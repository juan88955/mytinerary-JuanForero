import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:id" element={<CityDetail />} /> {/* Cambiado */}
      </Routes>
    </Router>
  );
}

export default App;