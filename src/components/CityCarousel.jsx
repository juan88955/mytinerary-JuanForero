import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

//Renderiza un carrusel de ciudades con funcionalidad de likes y navegación
const CityCarousel = ({ cities }) => {
    // Estado para controlar el slide actual
    const [currentSlide, setCurrentSlide] = useState(0);

    // Limitar el número de ciudades a 12 y generar likes estáticos
    const citiesWithLikes = useMemo(() => {
        return cities.slice(0, 12).map(city => ({
            ...city,
            likes: Math.floor(Math.random() * (2000 - 500 + 1)) + 500
        }));
    }, [cities]);

    // Efecto para actualizar el carrusel cada 5 segundos
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(citiesWithLikes.length / 4));
        }, 5000);

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(timer);
    }, [citiesWithLikes.length]);

    // Avanza al siguiente slide
    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(citiesWithLikes.length / 4));
    };

    // Retrocede al slide anterior
    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + Math.ceil(citiesWithLikes.length / 4)) % Math.ceil(citiesWithLikes.length / 4));
    };

    // Agrupar las ciudades en grupos de 4
    const cityGroups = [];
    for (let i = 0; i < citiesWithLikes.length; i += 4) {
        cityGroups.push(citiesWithLikes.slice(i, i + 4));
    }

    return (
        <div className="my-12 max-w-6xl mx-auto">
            <div className="relative overflow-hidden">
                {/* Contenedor principal del carrusel */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {cityGroups.map((group, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-8">
                            <div className="grid grid-cols-2 gap-6">
                                {group.map((city, cityIndex) => (
                                    // Tarjeta individual de ciudad
                                    <Link to={`/city/${city.name.toLowerCase()}`} key={cityIndex} className="block">
                                        <div className="relative rounded-lg overflow-hidden group">
                                            {/* Imagen de la ciudad */}
                                            <img
                                                src={city.image}
                                                alt={city.name}
                                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {/* Nombre de la ciudad */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-2">
                                                <h3 className="text-lg font-semibold">{city.name}</h3>
                                            </div>
                                            {/* Contador de likes */}
                                            <div className="absolute top-2 right-2 bg-white bg-opacity-50 rounded-full p-1 flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                <span className="ml-1 text-xs font-bold">{city.likes}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Botón para slide anterior */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                    &#10094;
                </button>
                {/* Botón para siguiente slide */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                    &#10095;
                </button>
            </div>
            {/* Indicadores de navegación */}
            <div className="flex justify-center mt-4">
                {cityGroups.map((_, dot) => (
                    <button
                        key={dot}
                        className={`mx-2 w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === dot ? 'bg-black w-4' : 'bg-gray-300'}`}
                        onClick={() => setCurrentSlide(dot)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CityCarousel;