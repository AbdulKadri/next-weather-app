import { useState, useEffect } from 'react';
import { countries } from 'country-data';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MapLocation = dynamic(() => import('@/components/MapLocation'), {
    ssr: false,
});

const CurrentWeather = ({ data, cityImageUrl, cityImageUsernameData, unit }) => {
    const [cityName, setCityName] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTemp, setCurrentTemp] = useState('');
    const [currentFeelsLike, setCurrentFeelsLike] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [cityImage, setCityImage] = useState(cityImageUrl);
    const [cityImageUsername, setCityImageUsername] = useState(cityImageUsernameData);
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    const [unitVariables, setunitVariables] = useState(() => {
        if (unit === 'metric') {
            return {
                temp: '°C',
                speed: 'm/s',
                pressure: 'hPa',
            };
        } else {
            return {
                temp: '°F',
                speed: 'mph',
                pressure: 'hPa',
            };
        }
    });

    useEffect(() => {
        if (unit === 'metric') {
            setunitVariables({
                temp: '°C',
                speed: 'm/s',
                pressure: 'hPa',
            });
        } else {
            setunitVariables({
                temp: '°F',
                speed: 'mph',
                pressure: 'hPa',
            });
        }
    }, [unit]);

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

            // get city image and user
            setCityImage(cityImageUrl);
            setCityImageUsername(cityImageUsernameData)

            // get sunrise and sunset time
            const sunriseInMilliseconds = data.sys.sunrise * 1000;
            const sunriseInLocation = new Date(sunriseInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setSunrise(sunriseInLocation.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }));

            const sunsetInMilliseconds = data.sys.sunset * 1000;
            const sunsetInLocation = new Date(sunsetInMilliseconds + (timezoneOffset + localTimeOffset) * 1000);
            setSunset(sunsetInLocation.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }));

            // get lat and lon
            setLat(data.coord.lat);
            setLon(data.coord.lon);
        }
    }, [data, cityImageUrl, cityImageUsernameData]);

    return (
        <>
            {data && (<div className='flex w-4/5 h-[90vh] relative'>
                <div className='basis-1/2'>
                    <Image src={cityImage} alt='city image' width={1920} height={1080} className='w-full h-full' priority={true} />
                    <p className='absolute bottom-0 left-0 text-white font-bold p-3 bg-black/30 rounded-lg'>
                        Photo by <a href={`http://unsplash.com/${cityImageUsername}`} target='_blank' rel="noopener noreferrer"><u>{cityImageUsername}</u></a>
                    </p>
                </div>
                <div className='basis-1/2 flex flex-col items-center text-white'>
                    <div className='m-2'>
                        <h1 className="text-5xl m-2 text-center text-white bold">{cityName} {countryName}</h1>
                        <p className="text-center text-primary text-3xl">At {currentDate}, {currentTime}</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <div className='flex flex-col items-center w-full'>
                            <div className='flex items-center gap-2 mt-2'>
                                <img src={`icons/${data.weather[0].icon}.png`} width={80} height={80} />
                                <p className='text-center text-5xl font-bold'>{currentTemp}{unitVariables.temp}</p>
                            </div>
                            <div className='flex flex-col items-center w-full mt-2'>
                                <p className='text-center text-lg'>{data.weather[0].description}</p>
                                <p className='text-center mb-2 text-2xl'>Feels Like: {currentFeelsLike}{unitVariables.temp}</p>
                                <div className='flex justify-evenly w-full px-5'>
                                    <p className='text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text'>Sunrise: {sunrise}</p>
                                    <p className='text-lg bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text'>Sunset: {sunset}</p>
                                </div>
                                <div className='flex justify-evenly w-full mt-2 px-5'>
                                    <div className='text-center'>
                                        <p className='text-md'>Pressure</p>
                                        <p className='text-lg font-bold'>{data.main.pressure}{unitVariables.pressure}</p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-md'>Humidity</p>
                                        <p className='text-lg font-bold'>{data.main.humidity}%</p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-md'>Cloudiness</p>
                                        <p className='text-lg font-bold'>{data.clouds.all}%</p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-md'>Wind Speed</p>
                                        <p className='text-lg font-bold'>{data.wind.speed}{unitVariables.speed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/5 h-full justify-self-center self-center border-2 border-solid border-white rounded-lg m-2">
                        <MapLocation lat={lat} lon={lon} />
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default CurrentWeather