import axios from "axios";

const API_KEY = "ba69320829164f7bab168960aaa8ca1e";

function fixCoord(x) {
    return Number(x.toFixed(6));
}

export async function getRoute(start, end) {
    try {
        const startLat = fixCoord(start.latitude);
        const startLon = fixCoord(start.longitude);
        const endLat = fixCoord(end.lat);
        const endLon = fixCoord(end.lng);

        const url =
            `https://api.geoapify.com/v1/routing?waypoints=` +
            `${startLat},${startLon}|${endLat},${endLon}` +
            `&mode=drive&apiKey=${API_KEY}`;

        console.log("ROUTE URL =", url);

        const res = await axios.get(url);
        console.log("FULL RESPONSE =", res.data);

        if (!res.data.features || !res.data.features.length) {
            console.log("No route found!");
            return null;
        }

        return res.data.features[0].geometry.coordinates[0];
    } catch (e) {
        console.log("Route error:", e.response?.data || e);
        return null;
    }
}
