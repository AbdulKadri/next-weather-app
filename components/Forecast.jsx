import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <div className="h-full">
            <h1 className="text-white">Daily</h1>
            <Accordion allowZeroExpanded className="flex flex-wrap gap-10 text-white">
                {data.list.splice(0, 7).map((day, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="flex flex-col">
                                    <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="weather icon" />
                                    <p className="text-lg">{forecastDays[index]}</p>
                                    <p className="text-5xl">{Math.round(day.main.temp)}<span>&#176;C</span></p>
                                    <p>{day.weather[0].description}</p>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            Opened
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>

        </div>
    )
}

export default Forecast