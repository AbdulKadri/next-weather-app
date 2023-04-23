export const getCityName = async (latitude, longitude) => {
    try {
        const response = await fetchWithTimeout(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`, {}, 10000);
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village;
    } catch (error) {
        console.error('Error fetching city name:', error);
        return null;
    }
};