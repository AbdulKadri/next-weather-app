import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { validateCity } from '../utils/ValidateCity';

const CitySearch = ({ onError, searchError, className }) => {
    const [city, setCity] = useState('');
    const router = useRouter();

    const url = `${process.env.NEXT_PUBLIC_WEATHER_URL}${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidCity = await validateCity(city);

        if (isValidCity) {
            router.push({
                pathname: `/${city}`,
                query: { url },
            });
            setCity('');
            if (onError) {
                onError(false);
            }
        } else {
            if (onError) {
                onError(true);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`${className} flex w-3/5 bg-white rounded-full mt-2 ${searchError ? 'border-red-500 border-2' : ''}`}>
            <button className="h-10 p-2 my-2 ml-2 bg-gray-400 rounded-full hover:bg-gray-500">
                <FaSearch color="#68EDC6" className="h-6 w-6" />
            </button>
            <input type="search" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter a city name"
                className="h-10 w-full p-2.5 my-2 mr-2 outline-none overflow-hidden text-xl rounded-md" />

            {/* Display error if city name is not valid */}
            {searchError &&
                <p className="text-red-500 mt-2">Please enter a valid city name.</p>}
        </form>
    )
}

export default CitySearch