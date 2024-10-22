// Importamos las dependencias necesarias
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { fetchCities } from '../api/citiesApi.js';

// Componente para la barra de búsqueda de ciudades
const SearchBar = ({ value, onChange }) => (
    <div className="flex items-center bg-gray-700 rounded-full p-2 max-w-md mx-auto">
        <div className="text-blue-400 mr-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
        <input
            type="text"
            placeholder="Search your city"
            value={value}
            onChange={onChange}
            className="bg-transparent text-white placeholder-gray-400 flex-grow outline-none"
        />
        <div className="flex items-center">
            <div className="text-gray-400 mr-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
);

// Componente para mostrar cada tarjeta de ciudad
const CityCard = ({ city }) => (
    <div className="relative w-96 h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 transition-opacity duration-300 hover:opacity-90"></div>
        <div className="absolute top-0 left-0 p-4 text-white transition-transform duration-300 hover:translate-y-1">
            <h2 className="text-3xl font-bold">{city.name}</h2>
            <p className="flex items-center text-lg">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city.country}
            </p>
        </div>
        <Link
            to={`/cities/${city._id}`}
            className="absolute bottom-4 left-4 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300 text-lg"
        >
            View More
        </Link>
    </div>
);

// Componente principal que muestra todas las ciudades
const Cities = () => {
    // Estados para manejar la información
    const [cities, setCities] = useState([]); // Lista completa de ciudades
    const [filteredCities, setFilteredCities] = useState([]); // Ciudades filtradas
    const [filterText, setFilterText] = useState(''); // Texto del buscador
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [showScrollTop, setShowScrollTop] = useState(false); // Botón de scroll

    // Efecto para cargar las ciudades cuando el componente se monta
    useEffect(() => {
        const loadCities = async () => {
            try {
                setLoading(true);
                const response = await fetchCities();
                if (response && Array.isArray(response)) {
                    setCities(response);
                    setFilteredCities(response);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                setError('Failed to load cities');
            } finally {
                setLoading(false);
            }
        };

        loadCities();
    }, []);

    // Efecto para filtrar las ciudades según el texto de búsqueda
    useEffect(() => {
        setFilteredCities(
            cities.filter(city =>
                city.name.toLowerCase().startsWith(filterText.toLowerCase())
            )
        );
    }, [filterText, cities]);

    // Efecto para mostrar/ocultar el botón de scroll
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Función para volver al inicio de la página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Renderizado cuando está cargando
    if (loading) return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                <p className="text-white text-2xl">Loading...</p>
            </div>
        </MainLayout>
    );

    // Renderizado cuando hay un error
    if (error) return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                <p className="text-white text-2xl">{error}</p>
            </div>
        </MainLayout>
    );

    // Renderizado principal de la página
    return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 relative">
                {/* Sección del héroe con título */}
                <div className="hero-background-cities flex flex-col justify-center items-center">
                    <div className="text-center z-10 relative px-4">
                        <h1 className="text-5xl font-bold text-white mb-4">
                            Cities of the World
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Explore iconic destinations and hidden gems across the globe. Discover the unique charm and culture of cities that shape our world.
                        </p>
                    </div>
                </div>

                {/* Sección de búsqueda */}
                <div className="bg-slate-500 py-6">
                    <SearchBar
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>

                {/* Sección de resultados */}
                <div className="p-8">
                    {filteredCities.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6">
                            {filteredCities.map((city) => (
                                <CityCard key={city._id} city={city} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-300 mt-8 max-w-2xl mx-auto">
                            <p className="text-white/90 text-2xl">
                                No cities found matching your search. Try a different filter!
                            </p>
                        </div>
                    )}
                </div>

                {/* Botón para volver arriba */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
                        aria-label="Scroll to top"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </button>
                )}
            </div>
        </MainLayout>
    );
};

// Exportamos el componente
export default Cities;