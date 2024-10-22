// URL base de nuestra API
const BASE_URL = 'http://localhost:8080/api';

// Función para traer todas las ciudades de la base de datos
const fetchCities = () =>
  fetch(`${BASE_URL}/cities`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success && Array.isArray(data.response)) {
        return data.response;
      }
      return [];
    })
    .catch(error => {
      console.error('There was a problem fetching the cities:', error);
      throw error;
    });

// Función para traer una ciudad específica usando su ID
const getCityById = (id) =>
  fetch(`${BASE_URL}/cities/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.response) {
        return data.response;
      }
      throw new Error('Invalid data format received');
    })
    .catch(error => {
      console.error('Error fetching city by id:', error);
      throw error;
    });

// Exportamos las funciones
export { fetchCities, getCityById };