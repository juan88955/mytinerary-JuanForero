import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { fetchCitiesAsync, setFilterText } from '../store/slices/citiesSlice';

// Componente para la barra de búsqueda de ciudades
const SearchBar = ({ value, onChange }) => (
    <div className="flex items-center bg-gray-700 rounded-full p-2 max-w-md mx-auto">
        <div className="text-blue-400 mr-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
        {/* Entrada de texto para la búsqueda */}
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
const CityCard = ({ city }) => {
    if (!city || !city._id) return null;

    return (
        <div className="relative w-96 h-64 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=City+Image';
                }}
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
};

// Componente principal
const Cities = () => {
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    const { cities, loading, error } = useSelector((state) => state.cities); // Selecciona el estado de las ciudades
    const [filterText, setFilterTextLocal] = useState(''); // Estado local para el texto de búsqueda
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Efecto para cargar las ciudades iniciales
    useEffect(() => {
        dispatch(fetchCitiesAsync(''));
    }, [dispatch]);

    // Efecto para manejar la actualización del filtro de búsqueda
    useEffect(() => {
        dispatch(setFilterText(filterText)); // Actualiza el filtro de texto en el store de Redux
        setIsSearching(true);
        const searchTimer = setTimeout(() => {
            dispatch(fetchCitiesAsync(filterText))
                .finally(() => setIsSearching(false));
        }, 300);

        return () => {
            clearTimeout(searchTimer);
            setIsSearching(false);
        };
    }, [filterText, dispatch]);

    // Manejador del cambio en la búsqueda
    const handleSearchChange = (e) => {
        setFilterTextLocal(e.target.value); // Actualiza el estado local del texto de búsqueda
    };

    // Efecto para el botón de scroll
    useEffect(() => {
        const toggleVisibility = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Función para scroll hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Renderizado cuando está cargando
    if (loading && !isSearching) return (
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

    // Renderizado principal
    return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 relative">
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

                <div className="bg-slate-500 py-6">
                    <SearchBar
                        value={filterText}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="p-8 relative">
                    {isSearching && (
                        <div className="absolute top-0 left-0 right-0 flex justify-center mb-8">
                            <div className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow-lg flex items-center space-x-2 mb-6">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Searching cities...</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        {cities.length > 0 ? (
                            cities.map((city) => (
                                <CityCard key={city._id} city={city} />
                            ))
                        ) : (
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center mt-8 max-w-2xl mx-auto">
                                <p className="text-white/90 text-2xl">
                                    No cities found matching your search. Try a different filter!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

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