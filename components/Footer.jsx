import Link from "next/link"

const Footer = () => {
    return (
        <footer>
            <p className="h-[5vh] flex justify-center items-center text-center bg-gray-400 p-2">© 2023, Website Made by &nbsp;
                <u className="text-red-900"><Link href="https://github.com/AbdulKadri">Abdul-Rahime Kadri</Link></u>
            </p>
        </footer>
    )
}

export default Footer