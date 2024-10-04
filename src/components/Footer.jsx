import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

//componente de la pie de página
const Footer = () => {
    return (
        <footer className="bg-black bg-opacity-90 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Columna 1: Información del sitio */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-white">My Tinerary</h3>
                        <p className="mb-2">Find your perfect trip, designed by insiders who know and love their cities!</p>
                        <p>123 Travel Street, Adventure City, AC 12345</p>
                    </div>

                    {/* Columna 2: Menú de navegación */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul>
                            <li className="mb-2"><Link to="/" className="hover:text-white transition duration-300">Home</Link></li>
                            <li className="mb-2"><Link to="/cities" className="hover:text-white transition duration-300">Cities</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Redes sociales */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaFacebook size={24} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaTwitter size={24} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaInstagram size={24} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300"><FaLinkedin size={24} /></a>
                        </div>
                    </div>

                    {/* Columna 4: Suscripción al boletín */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Subscribe to Our Newsletter</h4>
                        <form className="flex flex-col space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 bg-gray-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                    <p className="text-white font-semibold">&copy; {new Date().getFullYear()} MyTinerary. All rights reserved. Developer: Juan Forero CH5</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;