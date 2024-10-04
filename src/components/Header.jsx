import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaHome, FaCity } from 'react-icons/fa';

const Header = () => {
  // Estado para controlar la apertura/cierre del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para controlar si el header debe ser sticky
  const [isSticky, setIsSticky] = useState(false);
  // Hooks de react-router-dom para navegación y obtención de la ubicación actual
  const navigate = useNavigate();
  const location = useLocation();

  // Efecto para cerrar el menú si la pantalla se hace más grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Efecto para prevenir el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Efecto para manejar el comportamiento sticky del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para desplazar la página hacia arriba y navegar a la página principal si es necesario
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
      {/* Contenido principal del header */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo y nombre de la aplicación */}
        <button onClick={scrollToTop} className="flex items-center bg-transparent border-none cursor-pointer">
          <span className="text-3xl font-bold mr-2">🌍</span>
          <span className="text-2xl font-extrabold tracking-tight">My Tinerary</span>
        </button>
        {/* Iconos de usuario y menú */}
        <div className="flex items-center">
          <FaUser className="text-2xl mr-4" />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menú lateral para móviles */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;