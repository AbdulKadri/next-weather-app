import CitySearch from "./CitySearch"
import Link from "next/link"

const Nav = () => {
    return (
        <nav className="w-full flex justify-around sticky top-0 border border-solid border-red-400">
            <Link href={'/'}><h2>Weather App</h2></Link>

            <div className="w-3/6 border border-solid border-blue-400 rounded full">
                <CitySearch className="border border-solid border-red-400" />
            </div>
        </nav>
    )
}

export default Nav