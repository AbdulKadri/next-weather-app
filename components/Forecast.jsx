import { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import Image from "next/image";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function degreesToCardinal(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(degrees / 45);
    return directions[index];
}

const Forecast = ({ data, unit }) => {
    const [unitVariables, setunitVariables] = useState(() => {
        if (unit === 'metric') {
            return {
                temp: '°C',
                speed: 'm/s',
                pressure: 'hPa',
                precipitation: 'mm',
            };
        } else {
            return {
                temp: '°F',
                speed: 'mph',
                pressure: 'hPa',
                precipitation: 'in',
            };
        }
    });
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    useEffect(() => {
        if (unit === 'metric') {
            setunitVariables({
                temp: '°C',
                speed: 'm/s',
                pressure: 'hPa',
                precipitation: 'mm',
            });
        } else {
            setunitVariables({
                temp: '°F',
                speed: 'mph',
                pressure: 'hPa',
                precipitation: 'in',
            });
        }
    }, [unit]);

    return (
        <>
            {data && (<div className="flex flex-col w-4/5 h-full my-2">
                <h1 className="text-3xl font-bold mb-4 text-white">Daily Forecast</h1>
                <Accordion allowZeroExpanded className="flex flex-col gap-4">
                    {data.list.slice(0, 7).map((day, index) => (
                        <AccordionItem key={index}>
                            <AccordionItemHeading>
                                <AccordionItemButton className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-200 to-blue-600 rounded-md">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <Image src={`/icons/${day.weather[0].icon}.png`} alt="Weather Icon" width={48} height={48} className="w-12 h-12 sm:w-14 sm:h-14" />
                                        <div>
                                            <p className="text-lg md:text-2xl font-bold">{forecastDays[index]}</p>
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                                <p className="text-sm sm:text-lg font-medium">{day.weather[0].description}</p>
                                                <p className="text-sm sm:text-lg font-medium">Min: {Math.round(day.temp.min)}{unitVariables.temp} / Max: {Math.round(day.temp.max)}{unitVariables.temp}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-3xl sm:text-5xl font-bold text-white ">{Math.round(day.temp.day)}<span>{unitVariables.temp}</span></p>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="px-4">
                                <div className="w-full pb-2 text-sm sm:text-lg font-bold text-center">
                                    <div className="flex justify-between sm:grid sm:grid-cols-3 bg-gradient-to-b from-blue-100 to-blue-300 w-full p-4 my-2 rounded-md">
                                        <p className="w-2/6 sm:w-full justify-self-start">Morning</p>
                                        <p className="w-3/6 sm:w-full justify-self-center">Feels Like: {Math.round(day.feels_like.morn)}{unitVariables.temp}</p>
                                        <p className="w-1/6 sm:w-full justify-self-end place-self-end">{Math.round(day.temp.morn)}{unitVariables.temp}</p>
                                    </div>
                                    <div className="flex justify-between sm:grid sm:grid-cols-3 bg-gradient-to-b from-blue-300 to-blue-500 w-full p-4 my-2 rounded-md">
                                        <p className="w-2/6 sm:w-full justify-self-start">Afternoon</p>
                                        <p className="w-3/6 sm:w-full justify-self-center">Feels Like: {Math.round(day.feels_like.day)}{unitVariables.temp}</p>
                                        <p className="w-1/6 sm:w-full justify-self-end place-self-end">{Math.round(day.temp.day)}{unitVariables.temp}</p>
                                    </div>
                                    <div className="flex justify-between sm:grid sm:grid-cols-3 bg-gradient-to-b from-blue-500 to-blue-700 w-full p-4 my-2 text-white rounded-md">
                                        <p className="w-2/6 sm:w-full justify-self-start">Evening</p>
                                        <p className="w-3/6 sm:w-full justify-self-center">Feels Like: {Math.round(day.feels_like.eve)}{unitVariables.temp}</p>
                                        <p className="w-1/6 sm:w-full justify-self-end place-self-end">{Math.round(day.temp.eve)}{unitVariables.temp}</p>
                                    </div>
                                    <div className="flex justify-between sm:grid sm:grid-cols-3 bg-gradient-to-b from-blue-700 to-blue-900 w-full p-4 my-2 text-white rounded-md">
                                        <p className="w-2/6 sm:w-full justify-self-start">Night</p>
                                        <p className="w-3/6 sm:w-full justify-self-center">Feels Like: {Math.round(day.feels_like.night)}{unitVariables.temp}</p>
                                        <p className="w-1/6 sm:w-full justify-self-end place-self-end">{Math.round(day.temp.night)}{unitVariables.temp}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Pressure:</h2>
                                        <p>{day.pressure} {unitVariables.pressure}</p>
                                    </div>
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Humidity:</h2>
                                        <p>{day.humidity}%</p>
                                    </div>
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Cloudiness:</h2>
                                        <p>{day.clouds}%</p>
                                    </div>
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Precipitation volume:</h2>
                                        <p>{Math.round(day.rain || 0)} {unitVariables.precipitation}</p>
                                    </div>
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Wind Speed:</h2>
                                        <p>{day.speed} {unitVariables.speed}</p>
                                    </div>
                                    <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                        <h2 className="font-medium text-gray-800">Wind Direction:</h2>
                                        <p>{degreesToCardinal(day.deg)}</p>
                                    </div>
                                </div>
                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>)}
        </>
    )
}

export default Forecast
