import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cities } from '../components/cityData.js';
import MainLayout from '../layouts/MainLayout';

//Componente CityDetail
const CityDetail = () => {
    // Extraer el nombre de la ciudad de los parámetros de la URL
    const { cityName } = useParams();

    // Buscar el objeto de la ciudad que coincida con el nombre de la ciudad (sin distinción entre mayúsculas y minúsculas)
    const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());

    // Si no se encuentra la ciudad, mostrar un mensaje de "Ciudad no encontrada"
    if (!city) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white">City not found</h1>
                </div>
            </MainLayout>
        );
    }

    // Si se encuentra la ciudad, renderizar los detalles de la ciudad
    return (
        <MainLayout>
            <div className="min-h-screen bg-slate-500 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Botón de Volver a Ciudades */}
                    <Link
                        to="/cities"
                        className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out mb-6"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cities
                    </Link>

                    {/* Tarjeta de detalles de la ciudad */}
                    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                        {/* Imagen de la ciudad con superposición y título */}
                        <div className="relative h-72 sm:h-96">
                            <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h1 className="text-4xl sm:text-5xl font-bold">{city.name}</h1>
                                <p className="text-xl sm:text-2xl mt-2">{city.country}</p>
                            </div>
                        </div>

                        {/* Descripción de la ciudad */}
                        <div className="p-6 sm:p-10 text-white">
                            <p className="text-lg mb-6">
                                {city.description}
                            </p>
                            {/* Mensaje de en construcción */}
                            <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center">
                                <p className="text-#fffefe-500 font-semibold text-xl">
                                    More information coming soon, under construction! 🚧
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CityDetail;