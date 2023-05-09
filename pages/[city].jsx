import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import axios from "axios"
import CurrentWeather from '@/components/currentWeather';
import Forecast from '@/components/Forecast';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import AirQuality from '@/components/AirQuality';

const CityPage = ({ currentWeatherData, forecastData, airQualityData, cityImageUrl, cityImageUsernameData }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [unit, setUnit] = useState('metric');

    const router = useRouter();

    useEffect(() => {
        setTitle(`Apex Weather | ${currentWeatherData.name}`);
        setIsLoading(false);
    }, [currentWeatherData]);

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
                className="absolute top-9 left-1/2 transform -translate-x-1/2 bg-primary text-black/80 font-bold py-1 px-4 rounded mb-4"
                onClick={() => {
                    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
                    const lat = currentWeatherData.coord.lat;
                    const lon = currentWeatherData.coord.lon;
                    setUnit(newUnit);
                    router.push({
                        pathname: '/city',
                        query: { lat, lon, unit: newUnit },
                    });
                }}
            >
                Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button>

            <div className='flex justify-center bg-black/80 py-5'>
                {currentWeatherData &&
                    (<CurrentWeather data={currentWeatherData} cityImageUrl={cityImageUrl} cityImageUsernameData={cityImageUsernameData} unit={unit} />)}
            </div>
            <div className='flex justify-center bg-black/80'>
                {forecastData &&
                    (<Forecast data={forecastData} unit={unit} />)}
            </div>
            <div className='flex justify-center bg-black/80'>
                {airQualityData && (
                    <AirQuality data={airQualityData} cityName={currentWeatherData.name} />
                )}
            </div>
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
