import Link from "next/link"

const Custom404 = () => {
    return (
        <div class="relative h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <button class="mt-5">
                <Link href={'/'}
                    class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
                >
                    <span
                        class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4cac2] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>

                    <span class="relative block px-8 py-3 border border-current bg-[#FF6A3D]">
                        <p className="text-white font-bold">Go Home</p>
                    </span>
                </Link>
            </button>
            <Link href={'https://tailwindcomponents.com/u/atif0075'} target="_" className="text-white absolute bottom-0 left-0 m-5 cursoer-pointer">page by <u>atif0075</u></Link>
        </div>
    )
}

export default Custom404