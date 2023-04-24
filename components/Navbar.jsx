import { useState } from 'react';
import CitySearch from "./CitySearch"
import Link from "next/link"
import Image from 'next/image';

const Nav = () => {
    const [error, setError] = useState(false);

    const handleError = (hasError) => {
        setError(hasError);
    };

    return (
        <nav className="w-full flex justify-center bg-gray-400 z-10 border-b-2 border-solid border-primary">
            <div className="w-4/5 flex justify-between items-center">
                <Link href={'/'} >
                    <Image src={'/Apex-Weather-Logo.svg'} alt={'Apex Weather logo'} width={150} height={150} />
                </Link>
                <div className="flex justify-end">
                    <div className="flex flex-col gap-1">
                        <CitySearch onError={handleError} className="w-[20rem]" />
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
