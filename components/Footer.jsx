import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <p className="text-center bg-gray-400 p-2">© 2023, Website Made by
                <Link href="https://github.com/AbdulKadri"> <u className="text-red-900">Abdul-Rahime Kadri</u></Link>
            </p>
        </footer>
    )
}

export default Footer