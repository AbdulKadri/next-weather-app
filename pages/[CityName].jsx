import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import axios from "axios"
import { useState, useEffect } from 'react'

const CityPage = () => {
    const router = useRouter()
    const url = router.query.url

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data);
        });
    }, [url]);

    return (
        <div>
            <Navbar />
            {data && (
                <div>
                    <p>Received data:</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default CityPage