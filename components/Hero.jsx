import { useState } from 'react';
import { FaMapPin } from 'react-icons/fa'
import CitySearch from '../components/CitySearch'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'

const Hero = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleError = (hasError) => {
        setError(hasError);
    };

    const handleGetLocation = async () => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const cityName = await getCityName(position.coords.latitude, position.coords.longitude);

                if (cityName) {
                    router.push(`/${cityName}?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                } else {
                    alert('Failed to fetch city name.');
                }
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const getCityName = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village;
        } catch (error) {
            console.error('Error fetching city name:', error);
            return null;
        }
    };

    if (isLoading) return (<Loading />);

    return (
        <main lang='en'>
            <div className="relative min-h-[80vh] w-screen
       bg-temp-image bg-cover bg-center bg-no-repeat shadow-cover
       grid grid-cols-2 place-content-center place-items-stretch">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl text-white w-4/5 text-center">
                        Curious About your city?
                    </h1>
                    <p className="text-2xl text-white w-4/5 text-center">Discover the current Weather, Air Pollution index & more</p>

                    <div className="flex flex-col items-center gap-1 w-2/5">
                        <CitySearch onError={handleError} setIsLoading={setIsLoading} className="w-full" />
                        {error && (
                            <p className="text-red-600 p-1 text-lg w-fit bg-gray-400 rounded-md">
                                Something went wrong please try again
                            </p>
                        )}
                    </div>

                    <button onClick={handleGetLocation} className="flex mt-2">
                        <FaMapPin color="#68EDC6" className="h-6 w-6" />
                        <p className="text-xl text-white">Check your location</p>
                    </button>

                    <p className="absolute bottom-0 left-0 text-white font-bold p-3">
                        Photo by
                        {' '}
                        <a href="https://unsplash.com/@benobro" target='_blank' rel="noopener noreferrer"><u>ben o'bro</u></a>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Hero