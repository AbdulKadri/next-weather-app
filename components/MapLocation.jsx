import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapLocation = ({ lat, lon }) => {
    const [zoom, setZoom] = useState(8);

    const weatherLayer = `http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

    return (
        <MapContainer key={`${lat}-${lon}`} center={[lat, lon]} zoom={zoom} style={{ height: "100%", width: "100%" }}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer url={weatherLayer} />
        </MapContainer>
    );
};


export default MapLocation;
