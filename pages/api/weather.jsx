// pages/api/getWeatherData.js
import axios from 'axios';

const getWeatherData = async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const currentWeatherResponse = await axios.get(`${process.env.NEXT_PUBLIC_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const currentWeatherData = currentWeatherResponse.data;

        // const forecastResponse = await axios.get(`${process.env.WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const forecastResponse = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`)
        const forecastData = forecastResponse.data;

        if (!currentWeatherData || !forecastData) {
            res.status(404).json({ message: 'Weather data not found' });
            return;
        }

        res.status(200).json({ currentWeatherData, forecastData });
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
