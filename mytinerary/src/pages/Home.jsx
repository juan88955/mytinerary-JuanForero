import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass } from 'react-icons/fa';
import CityCarousel from '../components/CityCarousel';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100"> {/* Mantenemos el fondo original */}
      {/* Hero section */}
      <div className="bg-black bg-opacity-90 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome to MyTinerary
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up">
            Find your perfect trip, designed by insiders who know and love their cities!
          </p>
          <Link 
            to="/cities" 
            className="group bg-white text-black font-bold py-3 px-6 rounded-full text-xl hover:bg-gray-200 transition duration-300 inline-flex items-center space-x-2 animate-pulse"
          >
            <FaCompass className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
            <span>Discover Amazing Cities Now!</span>
          </Link>
        </div>
      </div>

      {/* City Carousel */}
      <div className="bg-slate-500 w-full pb-12">
  <div className="container mx-auto px-4 py-12">
    <h2 className="text-3xl font-bold text-white mb-8 text-center">Popular Destinations</h2>
    <CityCarousel />
  </div>
</div>
    </div>
  );
};

export default Home;