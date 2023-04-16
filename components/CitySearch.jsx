import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import validateCity from '../utils/ValidateCity';

const CitySearch = ({ onError, className }) => {
    const [city, setCity] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidCity = await validateCity(city);

        if (isValidCity) {
            router.push(`/${city}`);
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
        <form onSubmit={handleSubmit} className={`${className} flex bg-white rounded-full mt-2`}>
            <button className="h-10 p-2 my-2 ml-2 bg-gray-400 rounded-full hover:bg-gray-500">
                <FaSearch color="#68EDC6" className="h-6 w-6" />
            </button>
            <input type="search" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter a city name"
                className="h-10 w-full p-2.5 my-2 mr-2 outline-none overflow-hidden text-xl rounded-md" />
        </form>
    )
}

export default CitySearch