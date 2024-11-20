import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCitiesAsync } from '../../store/slices/citiesSlice';

const CityCarousel = () => {
    const dispatch = useDispatch();
    const { cities = [], loading, error } = useSelector((state) => state.cities);
    const [currentSlide, setCurrentSlide] = useState(0);

    const citiesForDisplay = cities.slice(0, 12);
    const totalGroups = Math.ceil(citiesForDisplay.length / 4);

    useEffect(() => {
        dispatch(fetchCitiesAsync());
    }, [dispatch]);

    useEffect(() => {
        if (totalGroups <= 1) return;

        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % totalGroups);
        }, 5000);

        return () => clearInterval(timer);
    }, [totalGroups]);

    useEffect(() => {
        if (currentSlide >= totalGroups) {
            setCurrentSlide(0);
        }
    }, [totalGroups, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % totalGroups);
    };

    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + totalGroups) % totalGroups);
    };

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-pulse text-xl text-gray-600">
                    Loading amazing cities...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!cities || cities.length === 0) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-gray-600">No cities available</div>
            </div>
        );
    }

    const cityGroups = [];
    for (let i = 0; i < citiesForDisplay.length; i += 4) {
        const group = citiesForDisplay.slice(i, i + 4);
        if (group.length > 0) {
            cityGroups.push(group);
        }
    }

    return (
        <div className="my-12 max-w-6xl mx-auto px-4">
            <div className="relative">
                <div className="overflow-hidden rounded-xl relative">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {cityGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="w-full flex-shrink-0 px-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {group.map((city) => (
                                        <Link
                                            to={`/cities/${city._id}`}
                                            key={city._id}
                                            className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                        >
                                            <div className="relative rounded-xl overflow-hidden bg-white shadow-lg group h-[300px] w-full">
                                                <div className="h-full w-full">
                                                    <img
                                                        src={city.image}
                                                        alt={city.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = 'https://via.placeholder.com/400x300?text=City+Image';
                                                        }}
                                                    />
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                                                    <p className="text-sm text-white/90">{city.country}</p>
                                                </div>
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalGroups > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800/30 hover:bg-gray-800/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                aria-label="Previous slide"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800/30 hover:bg-gray-800/50 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                                aria-label="Next slide"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {totalGroups > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {cityGroups.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                                    ? 'bg-gray-800 w-6'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityCarousel;