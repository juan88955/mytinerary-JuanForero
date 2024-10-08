import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaHome, FaCity } from 'react-icons/fa';
import logo from '/logo.png';

const Header = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar si el header debe ser sticky
  const [isSticky, setIsSticky] = useState(false);

  // Hooks de react-router-dom para la navegación
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Efecto para manejar el comportamiento sticky del header
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Función para desplazarse al inicio de la página y navegar a la página principal
   */
  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`bg-black bg-opacity-90 text-white transition-all duration-300 z-50 ${isSticky ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo y nombre de la aplicación */}
        <button onClick={scrollToTop} className="flex items-center bg-transparent border-none cursor-pointer">
          <img src={logo} alt="My Tinerary Logo" className="h-8 mr-2" />
          <span className="text-2xl font-extrabold tracking-tight">My Tinerary</span>
        </button>
        <div className="flex items-center">
          {/* Icono de usuario con efecto hover para mostrar "Login" */}
          <div className="relative group mr-4">
            <FaUser className="text-2xl cursor-pointer" />
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Login</span>
          </div>
          {/* Botón de menú hamburguesa para móviles */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          {/* Navegación para pantallas medianas y grandes */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/cities" className="hover:text-gray-300 transition duration-300">Cities</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Menú lateral para móviles */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                <FaHome className="mr-2" /> Home
              </Link>
            </li>
            <li>
              <Link to="/cities" className="flex items-center text-xl hover:text-gray-300 transition duration-300" onClick={() => setIsMenuOpen(false)}>
                <FaCity className="mr-2" /> Cities
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Overlay para cerrar el menú al hacer clic fuera (solo en móviles) */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;