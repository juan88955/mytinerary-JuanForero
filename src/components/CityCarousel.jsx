import React, { useState, useEffect, useCallback } from 'react';

// Array de objetos que contiene información sobre las ciudades
const cities = [
    { name: 'Tokyo', image: 'https://i.pinimg.com/736x/79/57/b4/7957b4e964a06e197f6827022130e348.jpg' },
    { name: 'Dubai', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-gk_MCdfMM3WrtCQOFBfV4C7tXvCKcPW5g&s' },
    { name: 'Rome', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-aZ_2X9sq9MHYmTTxiPhIUC1Qm9WWUL0RQ&s' },
    { name: 'Cape Town', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoo2ciXv1kzwxGte2ZcfZ7KfuBuVwZtSjyuw&s' },
    { name: 'New York', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Long_Island_City_New_York_May_2015_panorama_3.jpg/1000px-Long_Island_City_New_York_May_2015_panorama_3.jpg' },
    { name: 'Bangkok', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzmDdB6ddesLRGbFUAsfj1QbCTLYj00efpg&s' },
    { name: 'Sydney', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHaHqcIstaVBzK-qMV7uU5yFCQcGZTCWvCxg&s' },
    { name: 'Moscow', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_3mDAZgLYf5kHdD79aR2H9E4sXC4GhNh5xw&s' },
    { name: 'London', image: 'https://i.pinimg.com/736x/6d/6a/88/6d6a8802a2267e47840be77a470a0dc4.jpg' },
    { name: 'Rio de Janeiro', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToKTzgcFgUx4obPT-00NOBEstA79Sxh01BA&s' },
    { name: 'Cairo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAopr79vdaHrm226rWIRtGGhPLzT4FfVTEA&s' },
    { name: 'Oporto', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmuFV-SdUwtTyoWiZ_7bpvXkc2clu-lvPbw&s' },
];

// Componente principal CityCarousel
const CityCarousel = () => {
    // Estado para controlar la diapositiva actual
    const [currentSlide, setCurrentSlide] = useState(0);
    // Estado para almacenar las ciudades con sus "me gusta" generados
    const [citiesWithLikes, setCitiesWithLikes] = useState([]);

    // Función para generar un número aleatorio de "me gusta"
    const generateLikes = useCallback(() => {
        return Math.floor(Math.random() * (2000 - 500 + 1)) + 500;
    }, []);

    // Función para actualizar los "me gusta" de todas las ciudades
    const updateLikes = useCallback(() => {
        setCitiesWithLikes(cities.map(city => ({
            ...city,
            likes: generateLikes()
        })));
    }, [generateLikes]);

    // Efecto para inicializar y actualizar periódicamente el carrusel
    useEffect(() => {
        updateLikes();
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(cities.length / 4));
            updateLikes();
        }, 5000);

        return () => clearInterval(timer);
    }, [updateLikes]);

    // Función para avanzar a la siguiente diapositiva
    const nextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % Math.ceil(cities.length / 4));
        updateLikes();
    };

    // Función para retroceder a la diapositiva anterior
    const prevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + Math.ceil(cities.length / 4)) % Math.ceil(cities.length / 4));
        updateLikes();
    };

    // Agrupar las ciudades en grupos de 4
    const cityGroups = [];
    for (let i = 0; i < citiesWithLikes.length; i += 4) {
        cityGroups.push(citiesWithLikes.slice(i, i + 4));
    }

    // Renderizado del componente
    return (
        <div className="my-12 max-w-4xl mx-auto">
            {/* Contenedor principal del carrusel */}
            <div className="relative overflow-hidden">
                {/* Contenedor de las diapositivas */}
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {/* Mapeo de los grupos de ciudades */}
                    {cityGroups.map((group, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-2 gap-4">
                                {group.map((city, cityIndex) => (
                                    <div key={cityIndex} className="relative rounded-lg overflow-hidden group">
                                        <img
                                            src={city.image}
                                            alt={city.name}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-2">
                                            <h3 className="text-lg font-semibold">{city.name}</h3>
                                        </div>
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
                {/* Botones de navegación */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                    &#10094;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
                >
                    &#10095;
                </button>
            </div>
            {/* Indicadores de diapositiva */}
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