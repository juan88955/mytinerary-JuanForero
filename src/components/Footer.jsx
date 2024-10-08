import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Definición del componente Footer
const Footer = () => {
    return (
        // Contenedor principal del footer
        <footer className="bg-black bg-opacity-90 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                {/* Grid para el contenido principal del footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna 1: Información del sitio */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">My Tinerary</h3>
                        <p className="mb-2">Find your perfect trip, designed by insiders who know and love their cities!</p>
                        <p>543 Main Street, Anytown, USA 71269</p>
                    </div>

                    {/* Columna 2: Menú de navegación y Redes sociales */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="mb-6">
                            <li className="mb-2"><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
                            <li className="mb-2"><Link to="/cities" className="hover:text-white transition duration-300">Cities</Link></li>
                        </ul>
                        <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                        {/* Iconos de redes sociales */}
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaFacebook size={24} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaTwitter size={24} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaInstagram size={24} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaLinkedin size={24} /></a>
                        </div>
                    </div>

                    {/* Columna 3: Información adicional */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">About Us</h4>
                        <p className="mb-2">MyTinerary is your go-to platform for discovering unique travel experiences curated by local experts.</p>
                        <p className="mb-2">We're passionate about helping you explore the world and create unforgettable memories.</p>
                        <p>Join our community of travelers today!</p>
                    </div>
                </div>

                {/* Sección de derechos de autor */}
                <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                    <p className="text-white font-semibold">&copy; {new Date().getFullYear()} MyTinerary. All rights reserved. Developer Juan Forero CH5</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;