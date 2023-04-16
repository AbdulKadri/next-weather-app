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
        <nav className="w-full flex justify-center sticky top-0 bg-gray-400 z-10">
            <div className="w-2/5 flex justify-between items-center">
                <Link href={'/'} className="">
                    <Image src={'/Apex-Weather-Logo.svg'} alt={'Apex Weather logo'} width={150} height={150} className="" />
                </Link>
                <div className="flex justify-end">
                    <div className="flex flex-col gap-1">
                        <CitySearch onError={handleError} className="w-full" />
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
