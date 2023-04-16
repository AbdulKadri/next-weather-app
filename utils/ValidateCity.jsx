import axios from 'axios';

const validateCity = async (city) => {
    try {
        await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/weather?city=${city}`
        );
        return true;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            console.error('Error validating city:', error);
            return false;
        }
    }
};

export default validateCity;
