const getWeatherMap = async (req, res) => {
    const { lat, lon } = req.query;

    try {
        const weatherMapUrl = `${process.env.NEXT_PUBLIC_WEATHER_MAP_URL}weathermap?layer=temp_new&lat=${lat}&lon=${lon}&zoom=13&appid=${process.env.WEATHER_API_KEY}&units=metric`;

        res.status(200).json({ weatherMapUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

export default getWeatherMap;
