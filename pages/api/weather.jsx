// pages/api/getWeatherData.js
import axios from 'axios';

const getWeatherData = async (req, res) => {
    const { lat, lon, unit } = req.query;

    try {
        const [currentWeatherResponse, forecastResponse, airQualityResponse] = await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=${unit}`),
            axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=${unit}`),
            axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)
        ]);

        const currentWeatherData = currentWeatherResponse.data;
        const forecastData = forecastResponse.data;
        const airQualityData = airQualityResponse.data;

        if (!currentWeatherData || !forecastData || !airQualityData) {
            res.status(404).json({ message: 'Weather data not found' });
            return;
        }

        res.status(200).json({ currentWeatherData, forecastData, airQualityData });
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Weather data not found' });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
}

export default getWeatherData;
