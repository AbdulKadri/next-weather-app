import axios from 'axios';

export default async function handler(req, res) {
    const { city } = req.query;

    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.UNSPLASH_API_KEY}`);

        const cityImageUrl = response.data.results[0]?.urls?.regular;

        if (!cityImageUrl) {
            res.status(404).json({ message: 'Image not found' });
            return;
        }

        res.status(200).json({ cityImageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}
