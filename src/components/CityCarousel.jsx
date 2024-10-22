// Importamos las dependencias necesarias
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchCities } from '../api/citiesApi.js';

// Componente de carrusel para mostrar las ciudades
const CityCarousel = () => {
    // Estados para manejar la información
    const [cities, setCities] = useState([]); // Lista de ciudades
    const [currentSlide, setCurrentSlide] = useState(0); // Slide actual
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores

    // Efecto para cargar las ciudades cuando el componente se monta
    useEffect(() => {
        const loadCities = async () => {
            try {
                const data = await fetchCities();
                if (Array.isArray(data)) {
                    setCities(data);
                } else if (data && Array.isArray(data.response)) {
                    setCities(data.response);
                } else {
                    throw new Error('Invalid data format');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to load cities');
                setLoading(false);
            }
        };

        loadCities();
    }, []);

    // Memorización de ciudades con likes aleatorios
    const citiesWithLikes = useMemo(() => {
        return (cities || []).slice(0, 12).map(city => ({
            ...city,
            likes: Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        }));
    }, [cities]);

    // Efecto para el autoplay del carrusel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(citiesWithLikes.length / 4));
        }, 5000);

        return () => clearInterval(timer);
    }, [citiesWithLikes.length]);

    // Función para ir al siguiente slide
    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(citiesWithLikes.length / 4));
    };

    // Función para ir al slide anterior
    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + Math.ceil(citiesWithLikes.length / 4)) % Math.ceil(citiesWithLikes.length / 4));
    };

    // Renderizado cuando está cargando
    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-pulse text-xl text-gray-600">
                    Loading amazing cities...
                </div>
            </div>
        );
    }

    // Renderizado cuando hay un error
    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    // Renderizado cuando no hay ciudades
    if (citiesWithLikes.length === 0) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-gray-600">No cities available</div>
            </div>
        );
    }

    // Agrupamos las ciudades en grupos de 4
    const cityGroups = [];
    for (let i = 0; i < citiesWithLikes.length; i += 4) {
        cityGroups.push(citiesWithLikes.slice(i, i + 4));
    }

    // Renderizado principal del carrusel
    return (
        <div className="my-12 max-w-6xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-xl">
                {/* Contenedor del carrusel */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {cityGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {group.map((city) => (
                                    <Link
                                        to={`/cities/${city._id}`}
                                        key={city._id}
                                        className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                    >
                                        <div className="relative rounded-xl overflow-hidden bg-white shadow-lg group h-[300px] w-full">
                                            <div className="h-full w-full">
                                                <img
                                                    src={city.image}
                                                    alt={city.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/400x300?text=City+Image';
                                                    }}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                                                <p className="text-sm text-white/90">{city.country}</p>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-sm font-bold text-gray-800">{city.likes.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Previous slide"
                >
                    ←
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Next slide"
                >
                    →
                </button>
            </div>

            {/* Indicadores de posición */}
            <div className="flex justify-center gap-2 mt-6">
                {cityGroups.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                            ? 'bg-gray-800 w-6'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Exportamos el componente
export default CityCarousel;