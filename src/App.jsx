import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importamos las páginas de nuestra aplicación
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';

// Componente principal que maneja el enrutamiento de la aplicación
function App() {
  return (
    // Router principal que envuelve toda la aplicación
    <Router>
      {/* Definición de rutas disponibles */}
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta para el listado de ciudades */}
        <Route path="/cities" element={<Cities />} />

        {/* Ruta para el detalle de una ciudad específica */}
        <Route path="/cities/:id" element={<CityDetail />} />
      </Routes>
    </Router>
  );
}

// Exportamos el componente App
export default App;