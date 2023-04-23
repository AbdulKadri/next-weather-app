import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <div className="flex flex-col w-4/5 h-full my-2">
            <h1 className="text-3xl font-bold mb-4">Daily Forecast</h1>
            <Accordion allowZeroExpanded className="flex flex-col gap-4">
                {data.list.slice(0, 7).map((day, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton className="flex justify-between items-center p-4 bg-blue-900 text-white rounded-md">
                                <div className="flex items-center gap-4">
                                    <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="weather icon" className="w-14 h-14" />
                                    <div>
                                        <p className="text-2xl font-bold">{forecastDays[index]}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-lg font-medium">{day.weather[0].description}</p>
                                            <p className="text-lg font-medium">{Math.round(day.main.temp_min)}&#176;C / {Math.round(day.main.temp_max)}&#176;C</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-5xl font-bold">{Math.round(day.main.temp)}<span>&#176;C</span></p>
                            </AccordionItemButton>

                        </AccordionItemHeading>
                        <AccordionItemPanel className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Pressure:</h2>
                                    <p>{day.main.pressure} hPa</p>
                                </div>
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Humidity:</h2>
                                    <p>{day.main.humidity}%</p>
                                </div>
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Cloudiness:</h2>
                                    <p>{day.clouds.all}%</p>
                                </div>
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Wind Speed:</h2>
                                    <p>{day.wind.speed}m/s</p>
                                </div>
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Sea Level:</h2>
                                    <p>{day.main.sea_level}m</p>
                                </div>
                                <div className="flex justify-between text-lg bg-gray-200 p-2 rounded-md">
                                    <h2 className="font-medium text-gray-800">Feels Like:</h2>
                                    <p>{Math.round(day.main.feels_like)}&#176;C</p>
                                </div>
                            </div>
                        </AccordionItemPanel>


                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default Forecast
