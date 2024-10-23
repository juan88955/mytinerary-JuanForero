// URL base de nuestra API
const BASE_URL = 'http://localhost:8080/api';

// Función para traer todas las ciudades
const fetchCities = async (searchTerm = '') => {
  try {
    const url = searchTerm
      ? `${BASE_URL}/cities?name=${encodeURIComponent(searchTerm)}`
      : `${BASE_URL}/cities`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    return data?.success && Array.isArray(data?.response) ? data.response : [];

  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Función para traer una ciudad por ID
const getCityById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cities/${id}`);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    if (!data?.response) throw new Error('Invalid data format received');

    return data.response;

  } catch (error) {
    console.error('Error fetching city by id:', error);
    throw error;
  }
};

// Exportamos las funciones
export { fetchCities, getCityById };