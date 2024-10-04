import React, { useState, useEffect } from 'react';

//imagenes de las ciudades
const cities = [
    { name: 'New York', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Long_Island_City_New_York_May_2015_panorama_3.jpg/1000px-Long_Island_City_New_York_May_2015_panorama_3.jpg' },
    { name: 'Tokyo', image: 'https://i.pinimg.com/736x/79/57/b4/7957b4e964a06e197f6827022130e348.jpg' },
    { name: 'London', image: 'https://i.pinimg.com/736x/6d/6a/88/6d6a8802a2267e47840be77a470a0dc4.jpg' },
    { name: 'Rome', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-aZ_2X9sq9MHYmTTxiPhIUC1Qm9WWUL0RQ&s' },
    { name: 'Sydney', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHaHqcIstaVBzK-qMV7uU5yFCQcGZTCWvCxg&s' },
    { name: 'Rio de Janeiro', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTToKTzgcFgUx4obPT-00NOBEstA79Sxh01BA&s' },
    { name: 'Cairo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAopr79vdaHrm226rWIRtGGhPLzT4FfVTEA&s' },
    { name: 'Moscow', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_3mDAZgLYf5kHdD79aR2H9E4sXC4GhNh5xw&s' },
    { name: 'Dubai', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv-gk_MCdfMM3WrtCQOFBfV4C7tXvCKcPW5g&s' },
    { name: 'Bangkok', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzmDdB6ddesLRGbFUAsfj1QbCTLYj00efpg&s' },
    { name: 'Cape Town', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoo2ciXv1kzwxGte2ZcfZ7KfuBuVwZtSjyuw&s' },
    { name: 'Oporto', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmuFV-SdUwtTyoWiZ_7bpvXkc2clu-lvPbw&s' },
];

//componente de la carrusel
const CityCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    //funcion que cambia la imagen de la carrusel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 5000);

        return () => clearInterval(timer);
    }, []);
    //funcion que crea grupos de 4 ciudades
    const cityGroups = [];
    for (let i = 0; i < cities.length; i += 4) {
        cityGroups.push(cities.slice(i, i + 4));
    }
    //funcion que mueve a la siguiente imagen
    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    };
    //funcion que mueve a la imagen anterior
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
    };
    //componente de la carrusel
    return (
        <div className="my-12 max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {/* grupos de 4 ciudades */}
                    {cityGroups.map((group, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                            <div className="grid grid-cols-2 gap-4">
                                {group.map((city, cityIndex) => (
                                    <div key={cityIndex} className="relative">
                                        <img
                                            src={city.image}
                                            alt={city.name}
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        {/* texto de la ciudad */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                                            <h3 className="text-lg font-semibold">{city.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {/* botones de la carrusel */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                >
                    &#10094;
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
                >
                    &#10095;
                </button>
            </div>
            {/* botones de control */}
            <div className="flex justify-center mt-4">
                {[0, 1, 2].map((dot) => (
                    <button
                        key={dot}
                        className={`mx-2 w-3 h-3 rounded-full ${currentSlide === dot ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => setCurrentSlide(dot)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CityCarousel;