import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import axios from "axios"
import { useRouter } from 'next/router';
import Loading from '../components/Loading'
import { gsap } from 'gsap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic'

// Dynamic imports
const CurrentWeather = dynamic(() => import('../components/currentWeather'));
const Forecast = dynamic(() => import('../components/Forecast'));
const AirQuality = dynamic(() => import('../components/AirQuality'));


const CityPage = ({ currentWeatherData, forecastData, airQualityData, cityImageUrl, cityImageUsernameData }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [unit, setUnit] = useState('metric');
    const switchButtonRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        setTitle(`Apex Weather | ${currentWeatherData.name}`);
        setIsLoading(false);
    }, [currentWeatherData]);


    useEffect(() => {
        gsap.fromTo(
            switchButtonRef.current,
            { x: -10, y: -10 },
            {
                x: 10,
                y: 10,
                repeat: 3,
                yoyo: true,
                duration: 0.1,
                ease: 'power1.inOut',
                onComplete: () => {
                    gsap.set(switchButtonRef.current, { x: 0, y: 0 });
                },
            }
        );
    }, [])

    const showToast = (message) => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2000,
            closeButton: true,
        });
    };


    if (isLoading) return <Loading />;

    return (
        <div className='relative'>
            <Head>
                <title>{title}</title>
            </Head>
            <div className='h-full'>
                <Navbar setIsLoading={setIsLoading} />
            </div>
            <button
                ref={switchButtonRef}
                className="absolute top-15 sm:top-9 w-[fit] left-1/2 transform -translate-x-1/2 bg-primary text-background font-bold py-1 px-2 sm:px-4 rounded md:mb-4"
                onClick={async () => {
                    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
                    const lat = currentWeatherData.coord.lat;
                    const lon = currentWeatherData.coord.lon;
                    await router.push({
                        pathname: '/city',
                        query: { lat, lon, unit: newUnit },
                    });
                    setUnit(newUnit);
                    showToast(`Changed to ${newUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}`);
                }}
            >
                Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button>

            <div className='flex justify-center bg-background py-5'>
                {currentWeatherData &&
                    (<CurrentWeather data={currentWeatherData} cityImageUrl={cityImageUrl} cityImageUsernameData={cityImageUsernameData} unit={unit} />)}
            </div>
            <div className='flex justify-center bg-background'>
                {forecastData &&
                    (<Forecast data={forecastData} unit={unit} />)}
            </div>
            <div className='flex justify-center bg-background'>
                {airQualityData && (
                    <AirQuality data={airQualityData} cityName={currentWeatherData.name} />
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { lat, lon, unit = 'metric' } = query;

    // Used to get current location weather data
    const getCityName = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1&accept-language=en`);
            return response.data.address.city || response.data.address.town || response.data.address.village;
        } catch (error) {
            console.error('Error fetching city name:', error);
            return null;
        }
    };

    try {
        const weatherDataResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/weather?lat=${lat}&lon=${lon}&unit=${unit}`);
        const currentWeatherData = weatherDataResponse.data.currentWeatherData;
        const forecastData = weatherDataResponse.data.forecastData;
        const airQualityData = weatherDataResponse.data.airQualityData;

        // Get city name from Nominatim API
        const cityName = await getCityName(lat, lon);
        if (cityName) {
            currentWeatherData.name = cityName;
        }

        const unsplashResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/unsplash?city=${currentWeatherData.name}`);
        const cityImageUrl = unsplashResponse.data.cityImageUrl;
        const cityImageUsernameData = unsplashResponse.data.cityImageUser;

        return {
            props: { currentWeatherData, forecastData, airQualityData, cityImageUrl, cityImageUsernameData },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);

        if (error.code === 'ETIMEDOUT') {
            return {
                props: {
                    errorMessage: 'Request to Nominatim API timed out. Please try again later.',
                },
            };
        }

        return {
            notFound: true,
        };
    }
}


export default CityPage
