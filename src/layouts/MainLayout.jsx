import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Componente MainLayout: Estructura principal de la página
const MainLayout = ({ children }) => {
    return (
        // Contenedor principal con flexbox y altura mínima de pantalla completa
        <div className="flex flex-col min-h-screen">
            {/* Componente de encabezado */}
            <Header />

            {/* Contenido principal que crece para llenar el espacio disponible */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Componente de pie de página */}
            <Footer />
        </div>
    );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default MainLayout;