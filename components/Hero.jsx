import { useState } from 'react';
import { FaMapPin } from 'react-icons/fa'
import CitySearch from '../components/CitySearch'
import Link from 'next/link'

const Hero = () => {
    const [error, setError] = useState(false);

    const handleError = (hasError) => {
        setError(hasError);
    };

    return (
        <main lang='en'>
            <div className="relative min-h-[80vh] w-screen
       bg-temp-image bg-cover bg-center bg-no-repeat shadow-cover
       grid grid-cols-2 place-content-center place-items-stretch">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl text-white w-4/5 text-center">
                        Curious About your city?
                    </h1>
                    <p className="text-2xl text-white w-4/5 text-center">Discover the current Weather, Air Pollution index & more</p>

                    <div className="flex flex-col items-center gap-1 w-2/5">
                        <CitySearch onError={handleError} className="w-full" />
                        {error && (
                            <p className="text-red-600 p-1 text-lg w-fit bg-gray-400 rounded-md">
                                Something went wrong please try again
                            </p>
                        )}
                    </div>

                    <div className="flex mt-2">
                        <FaMapPin color="#68EDC6" className="h-6 w-6" />
                        <p className="text-xl text-white">Check your location</p>
                    </div>

                    <p className="absolute bottom-0 left-0 text-white font-bold p-3">
                        Image by
                        {' '}
                        <Link href="https://unsplash.com/@benobro"><u>ben o'bro</u></Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Hero