import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';

// Definición del componente principal App
function App() {
  return (
    // Router envuelve toda la aplicación para habilitar el enrutamiento
    <Router>
      {/* Routes define las rutas disponibles en la aplicación */}
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Home />} />

        {/* Ruta para la página de listado de ciudades */}
        <Route path="/cities" element={<Cities />} />

        {/* Ruta dinámica para los detalles de una ciudad específica */}
        <Route path="/city/:cityName" element={<CityDetail />} />
      </Routes>
    </Router>
  );
}

export default App;