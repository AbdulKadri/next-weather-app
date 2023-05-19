import { useState, Suspense, lazy } from 'react';
import { FaMapPin } from 'react-icons/fa'
import CitySearch from '../components/CitySearch'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'
const Canvas = lazy(() => import('../components/Canvas'));

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
            <div className="relative min-h-[100vh] w-screen
   bg-hero-background bg-cover bg-center bg-no-repeat shadow-cover
   flex flex-col justify-center items-center overflow-x-hidden lg:grid lg:grid-cols-2">
                <div className="flex flex-col justify-center items-center md:mt-6 lg:m-3 gap-3">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-white w-4/5 text-center font-bold">
                        Curious About Your City?
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-white w-4/5 text-center">Discover the Current Weather, Weather Forecast & Air Pollution index below</p>

                    <div className="flex flex-col items-center gap-1 w-4/5 md:w-3/5">
                        <CitySearch onError={handleError} setIsLoading={setIsLoading} className="w-full" />
                        {error && (
                            <p className="text-red-600 p-1 text-lg w-fit bg-gray-400 rounded-md">
                                Something went wrong please try again
                            </p>
                        )}
                    </div>

                    <button onClick={handleGetLocation} className="flex justify-center items-center bg-gray-400 rounded-md p-1">
                        <FaMapPin color="#68EDC6" className="h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6" />
                        <p className="text-xl text-white">Check your location</p>
                    </button>

                    <p className="absolute bottom-0 left-0 text-white font-bold p-3">
                        Photo by
                        {' '}
                        <a href="https://unsplash.com/@benobro" target='_blank' rel="noopener noreferrer"><u>ben o&apos;bro</u></a>
                    </p>
                </div>

                <div className="w-[400px] md:h-[500px] lg:h-full h-[400px] md:w-[500px] lg:w-full">
                    <Suspense>
                        <Canvas />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}

export default Hero