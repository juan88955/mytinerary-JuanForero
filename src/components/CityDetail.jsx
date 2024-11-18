import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCityByIdAsync } from '../store/slices/citiesSlice';
import { getItinerariesByCityIdAsync, clearCityDetail } from '../store/slices/cityDetailSlice';
import MainLayout from '../layouts/MainLayout';

// Componente para mostrar el precio con iconos de dinero
const PriceDisplay = ({ price }) => (
    <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-6 h-6 ${index < price ? 'text-yellow-400' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
            </svg>
        ))}
    </div>
);
// Componente para el itinerario
const ItineraryCard = ({ itinerary }) => {
    const [showActivities, setShowActivities] = useState(false);

    const formatDuration = (hours) => {
        const wholeHours = Math.floor(hours);
        const minutes = Math.round((hours - wholeHours) * 60);

        if (wholeHours === 0) {
            return `${minutes} min`;
        } else if (minutes === 0) {
            return `${wholeHours}h`;
        } else {
            return `${wholeHours}h ${minutes}min`;
        }
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-xl">
            {/* Imagen y título del itinerario */}
            <div className="mb-6 relative group transition-all duration-300">
                <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                />
                <div className="absolute bottom-0 w-full bg-black/50 p-4 rounded-b-lg">
                    <h3 className="text-xl font-bold text-white text-center">
                        {itinerary.title}
                    </h3>
                </div>
            </div>

            {/* Perfil del autor */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative w-16 h-16 mb-2">
                    <img
                        src={itinerary.author?.photo || 'https://via.placeholder.com/48?text=User'}
                        alt={itinerary.author?.name || 'Anonymous'}
                        className="w-full h-full rounded-full object-cover shadow-lg ring-2 ring-white/20"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/48?text=User';
                        }}
                    />
                </div>
                <span className="text-white text-xs mb-1">Created by</span>
                <div className="text-center">
                    <h2 className="text-white text-lg font-medium">
                        {itinerary.author?.name || 'Anonymous'}
                    </h2>
                </div>
            </div>

            {/* Información de precio, duración y likes */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-white flex flex-col items-center">
                    <div className="font-semibold mb-2">Price</div>
                    <PriceDisplay price={itinerary.price || 0} />
                </div>
                <div className="text-white flex flex-col items-center">
                    <div className="font-semibold mb-2">Duration</div>
                    <p className="flex items-center gap-1">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {formatDuration(itinerary.duration || 0)}
                    </p>
                </div>
                <div className="text-white flex flex-col items-center">
                    <div className="font-semibold mb-2">Likes</div>
                    <p className="flex items-center gap-1">
                        {itinerary.likes || 0}
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                    </p>
                </div>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {itinerary.hashtags && itinerary.hashtags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-105 hover:from-gray-800/90 hover:to-gray-700/90 cursor-default backdrop-blur-sm border border-white/10"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Botón de ver más */}
            <button
                onClick={() => setShowActivities(!showActivities)}
                className="bg-[#1B2C41] text-white px-6 py-2.5 rounded-md hover:bg-[#243751] transition-all duration-300 w-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
                {showActivities ? 'View Less' : 'View More'}
                <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${showActivities ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Contenido de actividades */}
            {showActivities && (
                <div className="mt-4 p-6 bg-gray-800/50 rounded-lg text-center">
                    <h4 className="text-xl font-bold text-white mb-2">Under Construction</h4>
                    <p className="text-gray-300">
                        Activities and comments coming soon! 🚧
                    </p>
                </div>
            )}
        </div>
    );
};

const CityDetail = () => {
    const { id } = useParams(); // Obtener el parámetro 'id' de la URL
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    // Seleccionar el estado actual de la ciudad e itinerarios
    const { currentCity: city, loading: cityLoading, error: cityError } = useSelector((state) => state.cities);
    const { currentItineraries: itineraries, loading: itinerariesLoading, error: itinerariesError } = useSelector((state) => state.cityDetail);
    const [showScrollButton, setShowScrollButton] = useState(false); // Estado para mostrar el botón de desplazamiento

    useEffect(() => {
        if (id) {
            dispatch(getCityByIdAsync(id)); // Obtener ciudad por ID
            dispatch(getItinerariesByCityIdAsync(id)); // Obtener itinerarios de la ciudad por ID
        }
        return () => {
            dispatch(clearCityDetail()); // Limpiar detalles de la ciudad al desmontar el componente
        };
    }, [id, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 200; // Mostrar el botón de desplazamiento si es mayor a 200px
            setShowScrollButton(show);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Eliminar evento de scroll al desmontar
    }, []);

    // Función para desplazarse suavemente hacia la parte superior de la página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Verificar si hay carga o error en los datos
    const loading = cityLoading || itinerariesLoading;
    const error = cityError || itinerariesError;

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                    <div className="animate-pulse text-white text-3xl font-semibold">
                        Exploring {city?.name || 'city'}...
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error || !city) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">City not found</h1>
                        <p className="text-gray-600 mb-6">Sorry, we couldn't find the city you're looking for.</p>
                        <Link
                            to="/cities"
                            className="bg-[#1B2C41] text-white px-6 py-2 rounded-md hover:bg-[#243751] transition-all duration-300 inline-flex items-center group"
                        >
                            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                            <span className="ml-2">Back to Cities</span>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* Mostrar el botón de desplazamiento si está habilitado */}
            {showScrollButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-20 bg-[#1B2C41] text-white w-12 h-12 rounded-full hover:bg-[#243751] transition-all duration-300 shadow-lg hover:scale-105 flex items-center justify-center opacity-90 hover:opacity-100"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}

            <div className="relative bg-slate-500">
                <div className="absolute inset-0">
                    <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10">
                    <div className="max-w-5xl mx-auto pt-32 px-8 pb-8">
                        <div className="text-center mb-12">
                            <h1 className="text-6xl font-bold text-white mb-4">{city.name}</h1>
                            <p className="text-3xl text-white/90 flex items-center justify-center mb-8">
                                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {city.country}
                            </p>

                            {/* Enlace para volver a la lista de ciudades */}
                            <div className="flex justify-center">
                                <Link
                                    to="/cities"
                                    className="flex items-center bg-[#1B2C41] text-white px-6 py-2 rounded-full hover:bg-[#243751] transition-all duration-300 group shadow-lg hover:scale-105"
                                >
                                    <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                    <span className="ml-2">Back to Cities</span>
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">{city.name}</h2>
                            <p className="text-white/90 text-xl leading-relaxed mb-8 text-center">{city.description}.</p>

                            {city && (
                                <div className="mt-8">
                                    <h3 className="text-2xl font-bold text-white mb-4 text-center">Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                            <span className="text-blue-300 text-2xl">🌍</span>
                                            <div>
                                                <span className="text-white/90 font-semibold">Continent</span>
                                                <p className="text-white/80">{city.continent}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                            <span className="text-blue-300 text-2xl">💰</span>
                                            <div>
                                                <span className="text-white/90 font-semibold">Currency</span>
                                                <p className="text-white/80">{city.currency}</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3">
                                            <span className="text-blue-300 text-2xl">🗣️</span>
                                            <div><span className="text-white/90 font-semibold">Language</span>
                                                <p className="text-white/80">{city.languages}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-500 pt-10">
                <div className="max-w-5xl mx-auto px-8 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">Available Itineraries</h2>
                        {itineraries && itineraries.length > 0 ? (
                            itineraries.map(itinerary => (
                                <ItineraryCard key={itinerary._id} itinerary={itinerary} />
                            ))
                        ) : (
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    No itineraries yet for {city.name}!
                                </h3>
                                <p className="text-white/90 text-xl">
                                    Be the first to create an amazing itinerary for this destination.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CityDetail;