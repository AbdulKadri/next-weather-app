import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <div className="flex flex-col w-4/5 h-full my-2">
            <h1 className="text-3xl">Daily</h1>
            <Accordion allowZeroExpanded className="flex flex-col gap-4">
                {data.list.splice(0, 7).map((day, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="flex justify-between items-center p-4 bg-black/80 text-white rounded-md">
                                    <div className="flex items-center gap-2">
                                        <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="weather icon" />
                                        <p className="text-3xl">{forecastDays[index]}</p>
                                        <p className="text-5xl">{Math.round(day.main.temp)}<span>&#176;C</span></p>
                                    </div>
                                    <div>
                                        <p>{day.weather[0].description}</p>
                                        <p>{Math.round(day.main.temp_min)}&#176;C / {Math.round(day.main.temp_max)}&#176;C</p>
                                    </div>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-around text-2xl bg-gray-400/80">
                                    <h2>Pressure:</h2>
                                    <p>{day.main.pressure} hPa</p>
                                </div>
                                <div className="flex justify-around text-2xl">
                                    <h2>Humidity:</h2>
                                    <p>{day.main.humidity}%</p>
                                </div>
                                <div className="flex justify-around text-2xl bg-gray-400/80">
                                    <h2>Pressure:</h2>
                                    <p>{day.clouds.all}%</p>
                                </div>
                                <div className="flex justify-around text-2xl">
                                    <h2>Wind Speed:</h2>
                                    <p>{day.wind.speed}m/s</p>
                                </div>
                                <div className="flex justify-around text-2xl bg-gray-400/80">
                                    <h2>Sea Level:</h2>
                                    <p>{day.main.sea_level}m</p>
                                </div>
                                <div className="flex justify-around text-2xl">
                                    <h2>Feels Like:</h2>
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