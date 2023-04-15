import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import axios from "axios"
import { useRouter } from 'next/router';


const CityPage = ({ data }) => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // Get the current date & time in the location
    useEffect(() => {
        if (data) {
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
        }
    }, [data]);

    // Round the temperature to the nearest whole number
    const roundedTemp = data ? Math.round(data.main.temp) : null;
    const roundedFeelsLike = data ? Math.round(data.main.feels_like) : null;

    return (
        <div>
            <Navbar />
            {data && (
                <div className='flex flex-col w-2/5 h-[80vh] mx-auto my-3 items-center bg-slate-400 rounded-xl'>
                    <div className='m-5'>
                        <h1 className="text-5xl text-center text-white bold">{data.name}</h1>
                        <p>@ {currentDate}, {currentTime}</p>
                    </div>
                    <p className="text-center m-5">
                        Weather: {data.weather[0].main}, {data.weather[0].description}
                        <br />
                        Clouds: {data.clouds.all}%
                    </p>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} width={100} height={100} className="" />
                    <p className="text-center m-5">{roundedTemp}<span>&#176;C</span></p>
                    <p className="text-center m-5">Feels Like: {roundedFeelsLike}<span>&#176;C</span></p>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query, res } = context;
    const url = query.url;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Check if the data contains a valid city name
        if (!data || !data.name) {
            res.statusCode = 404;
            return {
                notFound: true,
            };
        }

        return {
            props: { data },
        };
    } catch (error) {
        // In case of an error (e.g., invalid API key or request error), redirect to the 404 error page
        res.statusCode = 404;
        return {
            notFound: true,
        };
    }
}

export default CityPage
