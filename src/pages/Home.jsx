import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';
import CityCarousel from '../components/city/CityCarousel';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="hero-background bg-black bg-opacity-60 text-white py-20 md:py-32 lg:py-40 px-4 bg-center bg-no-repeat animate-zoom-pan-enhanced bg-[length:150%_auto]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in-down">
            Welcome to My Tinerary
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 lg:mb-10 animate-fade-in-up">
            Find your perfect trip, designed by insiders who know and love their cities!
          </p>
          <Link
            to="/cities"
            className="group bg-gray-800 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-base md:text-lg lg:text-xl hover:bg-gray-900 transition duration-300 inline-flex items-center space-x-2 md:space-x-3 animate-pulse"
          >
            <FaCompass className="text-xl md:text-2xl group-hover:rotate-90 transition-transform duration-300" />
            <span>Discover Amazing Cities Now!</span>
          </Link>
        </div>
      </div>

      <div className="bg-slate-500 flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Mytineraries</h2>
          <CityCarousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
