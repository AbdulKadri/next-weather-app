import axios from 'axios';

const getImageData = async (req, res) => {
    const { city } = req.query;

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.UNSPLASH_API_KEY}`);

        const cityImageUrl = response.data.results[0]?.urls?.regular;
        const cityImageUser = response.data.results[0]?.user?.username;

        if (!cityImageUrl) {
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        res.status(200).json({ cityImageUrl, cityImageUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

export default getImageData;