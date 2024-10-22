export const fetchCities = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cities');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.success && Array.isArray(data.response) ? data.response : [];
    } catch (error) {
      console.error('There was a problem fetching the cities:', error);
      throw error;
    }
  };