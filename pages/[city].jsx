import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import axios from "axios"
import CurrentWeather from '@/components/currentWeather';
import Forecast from '@/components/Forecast';
import Loading from '@/components/Loading';


const CityPage = ({ currentWeatherData, forecastData, cityImageUrl, cityImageUsernameData }) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTitle(`Apex Weather | ${currentWeatherData.name}`);
        setIsLoading(false);
    }, [currentWeatherData]);

    if (isLoading) return (<Loading />);


    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className='h-full'>
                <Navbar />
            </div>
            <div>
                {currentWeatherData &&
                    (<CurrentWeather data={currentWeatherData} cityImageUrl={cityImageUrl} cityImageUsernameData={cityImageUsernameData} />)}
            </div>
            <div className='flex justify-center'>
                {forecastData &&
                    (<Forecast data={forecastData} />)}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { lat, lon } = query;

    // Used to get current location weather data
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

    try {
        const weatherDataResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/weather?lat=${lat}&lon=${lon}`);
        const currentWeatherData = weatherDataResponse.data.currentWeatherData;
        const forecastData = weatherDataResponse.data.forecastData;

        // Get city name from Nominatim API
        const cityName = await getCityName(lat, lon);
        if (cityName) {
            currentWeatherData.name = cityName;
        }

        const unsplashResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/unsplash?city=${currentWeatherData.name}`);
        const cityImageUrl = unsplashResponse.data.cityImageUrl;
        const cityImageUsernameData = unsplashResponse.data.cityImageUser;

        return {
            props: { currentWeatherData, forecastData, cityImageUrl, cityImageUsernameData },
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
