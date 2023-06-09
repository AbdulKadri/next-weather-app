import { useState, useId } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '@/pages/api/geoDbCities';

const CitySearch = ({ onError, setIsLoading, className }) => {
    const [search, setSearch] = useState(null);
    const router = useRouter();

    const handleOnChange = async (searchData) => {
        setSearch(searchData);
        const [lat, lon] = searchData.value.split(' ');

        setIsLoading(true); // Set loading to true before routing
        await router.push(`/${searchData.label}?lat=${lat}&lon=${lon}`);
        setIsLoading(false); // Set loading to false after routing
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

    const customStyles = {
        singleValue: (base) => ({
            ...base,
            paddingBottom: '2px',
        }),
    };

    return (
        <div className={`${className}`}>
            <AsyncPaginate
                instanceId={useId()}
                placeholder="Enter a city name..."
                value={search}
                debounceTimeout={600}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                styles={customStyles}
            />
        </div>
    )
}

export default CitySearch