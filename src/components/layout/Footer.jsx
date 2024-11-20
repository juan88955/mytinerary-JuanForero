import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                            My Tinerary
                        </h3>
                        <p className="mb-2 text-gray-400">Find your perfect trip, designed by insiders who know and love their cities!</p>
                        <p className="text-gray-400">543 Main Street, Anytown, USA 71269</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                            Quick Links
                        </h4>
                        <ul className="mb-6">
                            <li className="mb-2">
                                <Link to="/" className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                    Home
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/cities" className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                    Cities
                                </Link>
                            </li>
                        </ul>
                        <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                            Follow Us
                        </h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                <FaFacebook size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="text-gray-400 hover:text-emerald-400 transition duration-300">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                            About Us
                        </h4>
                        <p className="mb-2 text-gray-400">MyTinerary is your go-to platform for discovering unique travel experiences curated by local experts.</p>
                        <p className="mb-2 text-gray-400">We're passionate about helping you explore the world and create unforgettable memories.</p>
                        <p className="text-gray-400">Join our community of travelers today!</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p>
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text font-semibold">
                            &copy; {new Date().getFullYear()} MyTinerary.
                        </span>
                        <span className="text-gray-400"> All rights reserved. Developer </span>
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text font-semibold">
                            Juan Forero CH5
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;