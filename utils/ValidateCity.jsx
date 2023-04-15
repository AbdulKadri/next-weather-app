import axios from 'axios';

export const validateCity = async (city) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_WEATHER_URL}${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;

        await axios.get(url);

        return true;
    } catch (error) {
        return false;
    }
};
