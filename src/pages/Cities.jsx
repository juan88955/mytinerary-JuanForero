import React from 'react';

// Definición del componente funcional Cities
const Cities = () => {
    // El componente retorna un elemento JSX
    return (
        // Contenedor principal
        <div className="min-h-screen bg-slate-500 flex flex-col justify-center items-center">
            {/* Título de la página */}
            <h1 className="text-4xl font-bold text-white mb-4">Cities</h1>
            {/* Mensaje informativo */}
            <p className="text-xl text-gray-200">Here will be the Cities search. Under construction 🚧</p>
        </div>
    );
};

export default Cities;