import React, { useState, useEffect, useCallback } from 'react';

// Componente funcional CityCarousel que recibe un array de ciudades como prop
const CityCarousel = ({ cities }) => {
    // Estado para controlar el slide actual
    const [currentSlide, setCurrentSlide] = useState(0);
    // Estado para almacenar las ciudades con likes generados aleatoriamente
    const [citiesWithLikes, setCitiesWithLikes] = useState([]);

    // Función memoizada para generar un número aleatorio de likes
    const generateLikes = useCallback(() => {
        return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
    }, []);

    // Función memoizada para actualizar los likes de las ciudades
    const updateLikes = useCallback(() => {
        setCitiesWithLikes(cities.map(city => ({
            ...city,
            likes: generateLikes()
        })));
    }, [generateLikes, cities]);

    // Efecto para inicializar y actualizar el carrusel cada 5 segundos
    useEffect(() => {
        updateLikes();
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(cities.length / 4));
            updateLikes();
        }, 5000);

        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(timer);
    }, [updateLikes, cities.length]);

    // Función para avanzar al siguiente slide
    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(cities.length / 4));
        updateLikes();
    };

    // Función para retroceder al slide anterior
    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + Math.ceil(cities.length / 4)) % Math.ceil(cities.length / 4));
        updateLikes();
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
                        <div key={index} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-2 gap-6">
                                {group.map((city, cityIndex) => (
                                    // Tarjeta individual de ciudad
                                    <div key={cityIndex} className="relative rounded-lg overflow-hidden group">
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
                        onClick={() => {
                            setCurrentSlide(dot);
                            updateLikes();
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CityCarousel;