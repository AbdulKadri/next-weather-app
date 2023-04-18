import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar'
import axios from "axios"
import CurrentWeather from '@/components/currentWeather';
import Forecast from '@/components/Forecast';

const CityPage = ({ currentWeatherData, forecastData, cityImageUrl }) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(`Apex Weather | ${currentWeatherData.name}`);
    }, [currentWeatherData]);

    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <div className='flex w-full h-full'>
                <div className='basis-1/2'>
                    {currentWeatherData && (<CurrentWeather data={currentWeatherData} cityImageUrl={cityImageUrl} />)}
                </div>
                <div className='basis-1/2 bg-black/80'>
                    {forecastData && (<Forecast data={forecastData} />)}
                </div>
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

        return {
            props: { currentWeatherData, forecastData, cityImageUrl },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true,
        };
    }
}

export default CityPage
