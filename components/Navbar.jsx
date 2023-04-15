import CitySearch from "./CitySearch"
import Link from "next/link"

const Nav = () => {
    return (
        <nav className="w-full flex justify-between items-center sticky top-0 bg-background py-3 px-6">
            <Link href={'/'}><h2>Weather App</h2></Link>
            <div className="flex justify-end w-3/6">
                <CitySearch />
            </div>
        </nav>
    )
}

export default Nav