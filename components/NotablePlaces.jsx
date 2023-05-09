const NotablePlaces = () => {
    return (
        <div className="min-h-screen bg-background text-white">
            <h2 className="pt-4 text-5xl text-center">Notable Places</h2>

            <div className="mt-16 flex justify-around">
                <div className="h-full border-2 border-solid border-red-800">
                    <p>Top 10 hottest cities in the world</p>
                    <div className="w-full min-h-full bg-gray-400">Graph</div>
                </div>

                <div className="h-full border-2 border-solid border-blue-800">
                    <p>Top 10 coldest cities in the world</p>
                    <div className="w-full min-h-full bg-gray-400">Bar Chart</div>
                </div>
            </div>
        </div>
    )
}

export default NotablePlaces