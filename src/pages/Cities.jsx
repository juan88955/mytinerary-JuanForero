import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cities } from '../components/cityData.js';
import MainLayout from '../layouts/MainLayout';

// Componente SearchBar: Barra de búsqueda con estilo personalizado
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
            <div className="bg-blue-500 rounded-full p-1">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
);

// Componente CityCard: Tarjeta para mostrar información de una ciudad
const CityCard = ({ city }) => (
    <div className="relative w-96 h-64 rounded-lg overflow-hidden shadow-lg">
        <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-70"></div>
        <div className="absolute top-0 left-0 p-4 text-white">
            <h2 className="text-3xl font-bold">{city.name}</h2>
            <p className="flex items-center text-lg">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city.country}
            </p>
        </div>
        <Link
            to={`/city/${city.name.toLowerCase()}`}
            className="absolute bottom-4 left-4 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300 text-lg"
        >
            View More
        </Link>
    </div>
);

// Componente principal Cities
const Cities = () => {
    // Estado para el texto de filtrado y la visibilidad del botón de scroll
    const [filterText, setFilterText] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Filtrado de ciudades basado en el texto de búsqueda
    const filteredCities = useMemo(() => {
        return cities.filter(city =>
            city.name.toLowerCase().startsWith(filterText.toLowerCase())
        );
    }, [filterText]);

    // Efecto para mostrar/ocultar el botón de scroll hacia arriba
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

    // Función para scroll suave hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 relative">
                {/* Sección hero con título y descripción */}
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

                {/* Barra de búsqueda */}
                <div className="bg-slate-500 py-6">
                    <SearchBar
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>

                {/* Lista de ciudades filtradas */}
                <div className="p-8">
                    {filteredCities.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-6">
                            {filteredCities.map((city, index) => (
                                <CityCard key={index} city={city} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-white text-2xl mt-8">
                            No cities found matching your search. Try a different filter!
                        </div>
                    )}
                </div>

                {/* Botón de scroll hacia arriba */}
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

export default Cities;