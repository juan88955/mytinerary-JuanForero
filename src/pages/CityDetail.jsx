import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Definición del componente CityDetail
const CityDetail = () => {
    // El componente retorna JSX
    return (
        // Usamos MainLayout como componente contenedor
        <MainLayout>
            {/* Contenedor principal con fondo y centrado */}
            <div className="min-h-screen bg-slate-500 flex items-center justify-center">
                {/* Tarjeta blanca con sombra y esquinas redondeadas */}
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                    {/* Título de la página */}
                    <h1 className="text-3xl font-bold mb-4">Under Construction</h1>
                    {/* Mensaje informativo */}
                    <p className="text-xl mb-6">This page is currently under development.</p>
                    {/* Botón de regreso utilizando Link de react-router-dom */}
                    <Link
                        to="/cities"
                        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300 inline-block"
                    >
                        Back to Cities
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

// Exportamos el componente para poder utilizarlo en otras partes de la aplicación
export default CityDetail;