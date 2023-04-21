import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import axios from "axios"
import CurrentWeather from '@/components/currentWeather';
import Forecast from '@/components/Forecast';

const CityPage = ({ currentWeatherData, forecastData, cityImageUrl, cityImageUsernameData }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTitle(`Apex Weather | ${currentWeatherData.name}`);
        setLoading(false);
    }, [currentWeatherData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center bg-black/80 h-screen text-white text-3xl">
                Loading...
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <div className='h-[10vh]'>
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

    try {
        const currentWeatherResponse = await axios.get(`${process.env.NEXT_PUBLIC_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const currentWeatherData = currentWeatherResponse.data;

        const forecastResponse = await axios.get(`${process.env.NEXT_PUBLIC_WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const forecastData = forecastResponse.data;

        const unsplashResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/unsplash?city=${currentWeatherData.name}`);
        const cityImageUrl = unsplashResponse.data.cityImageUrl;
        const cityImageUsernameData = unsplashResponse.data.cityImageUser;

        return {
            props: { currentWeatherData, forecastData, cityImageUrl, cityImageUsernameData },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true,
        };
    }
}

export default CityPage
