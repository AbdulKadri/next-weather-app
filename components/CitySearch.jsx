import { useState, useId } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '@/pages/api/geoDbCities';

const CitySearch = ({ onError, className }) => {
    const [search, setSearch] = useState(null);
    const router = useRouter();

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        const [lat, lon] = searchData.value.split(' ');

        router.push(`/${searchData.label}?lat=${lat}&lon=${lon}`);
    };

    const loadOptions = async (inputValue) => {
        return axios.request(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
            .then(function (response) {
                onError(false);
                return {
                    options: response.data.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(function (err) {
                onError(true);
                console.error(err)
                return {
                    options: []
                };
            });
    };

    return (
        <div className={`${className}`}>
            <AsyncPaginate
                instanceId={useId()}
                placeholder="Search a city..."
                value={search}
                debounceTimeout={600}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default CitySearch