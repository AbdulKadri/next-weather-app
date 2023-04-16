import axios from 'axios';

const getWeatherData = async (req, res) => {
    const { city } = req.query;

    try {
        const response = await axios.get(`${process.env.WEATHER_URL}${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;

        if (!weatherData || !weatherData.name) {
            res.status(404).json({ message: 'Weather data not found' });
            return;
        }

        res.status(200).json(weatherData);
    } catch (error) {
        console.error(error);
        // Check for 404 status, which means the city was not found
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: 'Weather data not found' });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
}

export default getWeatherData;
