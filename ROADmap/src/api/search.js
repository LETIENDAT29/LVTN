import axios from "axios";

const API_KEY = "ba69320829164f7bab168960aaa8ca1e";

export async function searchPlaces(text) {
    try {
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            text
        )}&apiKey=${API_KEY}`;
        const res = await axios.get(url);
        return res.data.features; // danh sách địa điểm
    } catch (e) {
        console.log("Search error:", e);
        return [];
    }
}
