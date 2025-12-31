import * as Location from "expo-location";

export async function getCurrentLocation() {
    // Xin quyền
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        alert("Ứng dụng cần quyền truy cập vị trí");
        return null;
    }

    // Lấy vị trí hiện tại
    let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
    });

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
}
