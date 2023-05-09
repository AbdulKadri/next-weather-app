const ClimateChange = () => {
    return (
        <div className="min-h-screen bg-background text-white">
            <h2 className="pt-4 text-5xl text-center">Climate Change</h2>

            <div className="mt-16 flex flex-col justify-around">
                <h3 className="text-3xl text-center">What is it?</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis accusantium unde cum quasi numquam velit quod suscipit facilis? Minus rerum necessitatibus sequi ducimus corporis officiis excepturi quam inventore, cum tempore.</p>
            </div>

            <div className="mt-16 flex justify-around border border-solid border-black">
                <div>Image Here</div>
                <div className="border border-solid border-purple-900">
                    <p>How can we help? | +</p>
                    <p>Total global efforts | +</p>
                    <p>Future of climate change | +</p>
                </div>
            </div>
        </div>
    )
}

export default ClimateChange