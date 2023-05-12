import { useState } from 'react';
import CitySearch from "./CitySearch"
import Link from "next/link"
import Image from 'next/image';

const Nav = ({ setIsLoading }) => {
    const [error, setError] = useState(false);

    const handleError = (hasError) => {
        setError(hasError);
    };

    return (
        <nav className="w-full flex justify-center bg-black/80 z-10 border-b-2 border-solid border-primary">
            <div className="w-5/6 md:w-4/5 flex justify-between items-center">
                <div className="w-1/3">
                    <Link href={'/'} >
                        <Image src={'/Apex-Weather-Logo.svg'} alt={'Apex Weather logo'} width={150} height={150} />
                    </Link>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col gap-1">
                        <CitySearch onError={handleError} setIsLoading={setIsLoading} className="xl:w-[20rem]" />
                        {error && (
                            <div className="text-red-600 text-lg text-center">
                                Please enter a valid city name.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
