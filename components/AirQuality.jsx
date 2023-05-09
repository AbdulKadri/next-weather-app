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
                        <div className="flex items-center gap-10 mb-4">
                            <h1 className="text-3xl font-bold">{cityName} Air Quality Index </h1>
                            <p className="text-2xl font-bold bg-primary text-background p-2 rounded-md">{aqi} - {airQualityDescription}</p>
                        </div>
                        <p className="text-lg mb-4">
                            The Air Quality Index (AQI) is on a scale from 1 to 5, with 1 being the best air quality and 5 being the worst. The AQI considers several pollutants to provide an overall assessment of the air quality.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="p-4">
                                <div className="w-full">
                                    {/* <p className="text-4xl font-bold mb-2">Air Quality Index</p>
                                    <p className="text-2xl font-medium mb-4">{aqi} - {airQualityDescription}</p> */}

                                    <p className="text-2xl font-bold mb-2">Main Pollutants</p>
                                    <div className="grid grid-cols-4 gap-4 text-xl font-medium">
                                        <p><span className="text-2xl">CO: </span>{mainPollutant.co} µg/m³</p>
                                        <p><span className="text-2xl">NO: </span>{mainPollutant.no} µg/m³</p>
                                        <p><span className="text-2xl">NO2: </span>{mainPollutant.no2} µg/m³</p>
                                        <p><span className="text-2xl">O3: </span>{mainPollutant.o3} µg/m³</p>
                                        <p><span className="text-2xl">SO2: </span>{mainPollutant.so2} µg/m³</p>
                                        <p><span className="text-2xl">PM2.5: </span>{mainPollutant.pm2_5} µg/m³</p>
                                        <p><span className="text-2xl">PM10: </span> {mainPollutant.pm10} µg/m³</p>
                                        <p><span className="text-2xl">NH3: </span>{mainPollutant.nh3} µg/m³</p>
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
