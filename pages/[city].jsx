import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import axios from "axios"
import { countries } from 'country-data'
import Image from 'next/image';

const CityPage = ({ data, cityImageUrl }) => {
    const [cityName, setCityName] = useState(data.name);
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTemp, setCurrentTemp] = useState('');
    const [currentFeelsLike, setCurrentFeelsLike] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [cityImage, setCityImage] = useState(cityImageUrl);

    useEffect(() => {
        if (data) {
            // Get the city name
            setCityName(data.name);

            // Get the current date & time in the location
            const timezoneOffset = data.timezone;
            const localTimeOffset = new Date().getTimezoneOffset() * 60;
            const currentTimeInMilliseconds = new Date().getTime();
            const currentTimeInLocation = new Date(currentTimeInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setCurrentTime(currentTimeInLocation.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }));

            const currentDateInMilliseconds = data.dt * 1000;
            const currentDateInLocation = new Date(currentDateInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setCurrentDate(currentDateInLocation.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric"

            }));

            // Round the temperature to the nearest whole number
            setCurrentTemp(Math.round(data.main.temp));
            setCurrentFeelsLike(Math.round(data.main.feels_like));

            // convert the country code to the country name
            setCountryCode(data.sys.country);
            setCountryName(countries[data.sys.country].name);


            setCityImage(cityImageUrl);
        }
    }, [data]);



    return (
        <div className='min-h-screen'>
            <Head>
                <title>Apex Weather | {cityName}</title>
            </Head>
            <Navbar />
            {data && (
                <div className='flex w-full h-[90vh]'>
                    <div className='basis-1/2'>
                        <Image src={cityImage} alt='city image' width={1920} height={1080} className='w-full h-full' />
                    </div>
                    <div className='basis-1/2 flex flex-col w-full items-center bg-black/80 text-white'>
                        <div className='m-5'>
                            <h1 className="text-5xl m-2 text-center text-white bold">{cityName} {countryName}</h1>
                            <p className="text-center text-red-400">At {currentDate}, {currentTime}</p>
                        </div>
                        <div className="flex items-center">
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} width={100} height={100} className="" />
                            <p className="text-center text-5xl">{currentTemp}<span>&#176;C</span></p>
                        </div>
                        <p className="text-center mb-2">
                            {data.weather[0].description}
                        </p>
                        <p className="text-center">Feels Like: {currentFeelsLike}<span>&#176;C</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const cityName = params.city;

    try {
        const weatherResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/weather?city=${cityName}`);
        const data = weatherResponse.data;

        const unsplashResponse = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/unsplash?city=${data.name}`);
        const cityImageUrl = unsplashResponse.data.cityImageUrl;

        return {
            props: { data, cityImageUrl },
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true,
        };
    }
}

export default CityPage
