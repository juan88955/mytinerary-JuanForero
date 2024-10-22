import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const CityDetail = () => {
    const { id } = useParams();
    const [city, setCity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCityById = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/api/cities/${id}`);

                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                if (data && data.response) {
                    setCity(data.response);
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCityById();
    }, [id]);

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
                            className="bg-[#1B2C41] text-white px-6 py-2 rounded-md hover:bg-[#243751] transition-all duration-300 inline-flex items-center group shadow-md hover:shadow-lg text-base font-medium"
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
            <div className="min-h-screen relative">
                {/* Imagen de fondo que cubre toda la pantalla */}
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

                {/* Contenido superpuesto */}
                <div className="relative z-10 min-h-screen">
                    {/* Contenedor principal centrado */}
                    <div className="max-w-5xl mx-auto pt-32 px-8 pb-8">
                        {/* Título y país */}
                        <div className="text-center mb-12">
                            <h1 className="text-6xl font-bold text-white mb-4">{city.name}</h1>
                            <p className="text-3xl text-white/90 flex items-center justify-center">
                                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {city.country}
                            </p>
                        </div>

                        {/* Descripción y botón */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl">
                            <h2 className="text-3xl font-bold text-white mb-6">About {city.name}</h2>
                            <p className="text-white/90 text-xl leading-relaxed mb-8">{city.description}</p>
                            <div className="text-center">
                                <Link
                                    to="/cities"
                                    className="bg-[#1B2C41] text-white px-6 py-2 rounded-md hover:bg-[#243751] transition-all duration-300 inline-flex items-center group shadow-md hover:shadow-lg text-base font-medium"
                                >
                                    <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                                    <span className="ml-2">Back to Cities</span>
                                </Link>
                            </div>
                        </div>

                        {/* Sección Under Construction */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 mt-8">
                            <h2 className="text-3xl font-bold text-white mb-4">Under Construction</h2>
                            <p className="text-white/90 text-xl">
                                More amazing details about {city.name} coming soon! 🚧
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CityDetail;