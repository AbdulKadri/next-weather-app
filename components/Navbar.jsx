import { useState } from 'react';
import CitySearch from "./CitySearch"
import Link from "next/link"

const Nav = () => {
    const [error, setError] = useState(false);

    const handleError = (hasError) => {
        setError(hasError);
    };

    return (
        <nav className="w-full flex justify-between items-center sticky top-0 bg-background py-3 px-6">
            <Link href={'/'}><h2>Weather App</h2></Link>
            <div className="flex justify-end w-3/6">
                <CitySearch onError={handleError} className="bg-blue-400" />
            </div>
            {error && (
                <div className="text-red-600 text-sm">
                    Please enter a valid city name.
                </div>
            )}
        </nav>
    )
}

export default Nav;
