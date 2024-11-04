import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cities from './pages/Cities';
import CityDetail from './components/CityDetail';
import Home from './pages/Home';

// Función principal de la aplicación
function App() {
  return (
    <Router>
      <Routes>
        {/* Definición de las rutas de la aplicación */}
        <Route path="/" element={<Home />} /> {/* Ruta para la página de inicio */}
        <Route path="/cities" element={<Cities />} /> {/* Ruta para la página de ciudades */}
        <Route path="/cities/:id" element={<CityDetail />} /> {/* Ruta para el detalle de una ciudad específica por ID */}
      </Routes>
    </Router>
  );
}

export default App;