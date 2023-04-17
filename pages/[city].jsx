import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import axios from "axios"
import { countries } from 'country-data'
import Image from 'next/image';

const CityPage = ({ currentWeatherData, cityImageUrl }) => {
    const [title, setTitle] = useState('');
    const [cityName, setCityName] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTemp, setCurrentTemp] = useState('');
    const [currentFeelsLike, setCurrentFeelsLike] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [cityImage, setCityImage] = useState(cityImageUrl);

    useEffect(() => {
        if (currentWeatherData) {
            // Get the city name
            setCityName(currentWeatherData.name);
            setTitle(`Apex Weather | ${currentWeatherData.name}`);

            // Get the current date & time in the location
            const timezoneOffset = currentWeatherData.timezone;
            const localTimeOffset = new Date().getTimezoneOffset() * 60;
            const currentTimeInMilliseconds = new Date().getTime();
            const currentTimeInLocation = new Date(currentTimeInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setCurrentTime(currentTimeInLocation.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }));

            const currentDateInMilliseconds = currentWeatherData.dt * 1000;
            const currentDateInLocation = new Date(currentDateInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setCurrentDate(currentDateInLocation.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric"

            }));

            // Round the temperature to the nearest whole number
            setCurrentTemp(Math.round(currentWeatherData.main.temp));
            setCurrentFeelsLike(Math.round(currentWeatherData.main.feels_like));

            // convert the country code to the country name
            setCountryCode(currentWeatherData.sys.country);
            setCountryName(countries[currentWeatherData.sys.country].name);


            setCityImage(cityImageUrl);
        }
    }, [currentWeatherData]);



    return (
        <div className='min-h-screen'>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            {currentWeatherData && (
                <div className='flex w-full h-[90vh]'>
                    <div className='basis-1/2'>
                        <Image src={cityImage} alt='city image' width={1920} height={1080} className='w-full h-full' priority={true} />
                    </div>
                    <div className='basis-1/2 flex flex-col w-full items-center bg-black/80 text-white'>
                        <div className='m-5'>
                            <h1 className="text-5xl m-2 text-center text-white bold">{cityName} {countryName}</h1>
                            <p className="text-center text-red-400">At {currentDate}, {currentTime}</p>
                        </div>
                        <div className="flex items-center">
                            <img src={`http://openweathermap.org/img/w/${currentWeatherData.weather[0].icon}.png`} width={100} height={100} className="" />
                            <p className="text-center text-5xl">{currentTemp}<span>&#176;C</span></p>
                        </div>
                        <p className="text-center mb-2">
                            {currentWeatherData.weather[0].description}
                        </p>
                        <p className="text-center">Feels Like: {currentFeelsLike}<span>&#176;C</span></p>
                    </div>
                </div>
            )}
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
