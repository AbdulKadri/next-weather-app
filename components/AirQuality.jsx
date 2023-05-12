const AirQuality = ({ data, cityName }) => {
    const aqi = data.list[0].main.aqi;
    const mainPollutant = data.list[0].components;

    const airQualityDescriptions = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const airQualityDescription = airQualityDescriptions[aqi];

    return (
        <>
            {data && (
                <div className="w-4/5 text-white p-5">
                    <div className="flex flex-col h-full my-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 mb-4">
                            <h1 className="text-3xl font-bold">{cityName} Air Quality Index </h1>
                            <p className="w-fit text-2xl font-bold bg-primary text-background p-2 rounded-md">{aqi} - {airQualityDescription}</p>
                        </div>
                        <p className="text-lg mb-4">
                            The Air Quality Index (AQI) is on a scale from 1 to 5, with 1 being the best air quality and 5 being the worst. The AQI considers several pollutants to provide an overall assessment of the air quality.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="w-full">
                                    <p className="text-2xl font-bold mb-2">Main Pollutants</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-medium [&>*]:border [&>*]:border-solid [&>*]:border-primary [&>*]:p-2">
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">CO: </span>{mainPollutant.co} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">NO: </span>{mainPollutant.no} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">NO2: </span>{mainPollutant.no2} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">O3: </span>{mainPollutant.o3} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">SO2: </span>{mainPollutant.so2} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">PM2.5: </span>{mainPollutant.pm2_5} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">PM10: </span> {mainPollutant.pm10} µg/m³</p>
                                        <p className="text-lg md:text-xl"><span className="text-xl md:text-2xl font-bold">NH3: </span>{mainPollutant.nh3} µg/m³</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AirQuality
