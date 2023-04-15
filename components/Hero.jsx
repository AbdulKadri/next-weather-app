import { useState } from 'react';
import { FaMapPin } from 'react-icons/fa'
import CitySearch from '../components/CitySearch'

const Hero = () => {
    const [searchError, setSearchError] = useState(false);

    return (
        <main lang='en'>
            <div className="min-h-[80vh] w-screen
       bg-temp-image bg-cover bg-center bg-no-repeat shadow-cover
       grid grid-cols-2 place-content-center place-items-stretch">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-5xl text-white w-4/5 text-center">
                        Curious About your city?
                    </h1>
                    <p className="text-2xl text-white w-4/5 text-center">Discover the current Weather, Air Pollution index & more in your city</p>

                    <CitySearch onError={setSearchError} searchError={searchError} />

                    <div className="flex mt-2">
                        <FaMapPin color="#68EDC6" className="h-6 w-6" />
                        <p className="text-xl text-white">Check your location</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Hero