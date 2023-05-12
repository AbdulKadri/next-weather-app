import { useState, useEffect } from 'react';
import { FaHome, FaSpinner } from 'react-icons/fa';

const Loading = () => {
    const [showLink, setShowLink] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLink(true);
        }, 5000); // 5 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="relative">
            {showLink && (
                <a href={'/'}>
                    <button className="flex justify-center items-center gap-2 absolute top-0 left-0 m-4 p-2 bg-black rounded-2xl text-2xl font-bold text-[#68EDC6]">
                        <FaHome color="#68EDC6" className="h-6 w-6" />
                        Home
                    </button>
                </a>
            )}
            <div className="flex flex-col justify-center items-center bg-black/80 h-screen text-white text-3xl">
                <div className="animate-spin h-12 w-12 mb-4">
                    <FaSpinner className="h-full w-full text-[#68EDC6]" />
                </div>
                <p className="text-center">
                    <span className="font-bold">Hang tight!</span> We're preparing your page...
                </p>
            </div>
        </div>
    );
};

export default Loading;
