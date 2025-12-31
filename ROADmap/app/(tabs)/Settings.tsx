import { getDetections } from "@/api/apiObject";
import { getRoute } from "@/api/routes";
import { searchPlaces } from "@/api/search";
import MapSearchBar from "app/component/Premium/MapSearchBar";

import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, {
    Heatmap,
    Marker,
    Polyline,
    PROVIDER_GOOGLE,
    UrlTile
} from "react-native-maps";

const GEOAPIFY_API_KEY = "ba69320829164f7bab168960aaa8ca1e";

export default function SettingScreen() {
    const mapRef = useRef(null);

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [currentPos, setCurrentPos] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [routeLine, setRouteLine] = useState(null);
    const [detections, setDetections] = useState([]);
    const [zoom, setZoom] = useState(15);

    // ============================
    // Zoom → size icon
    // ============================
    const getSizeByZoom = (zoomLevel) => {
        if (zoomLevel < 13) return 20;
        if (zoomLevel < 15) return 30;
        return 40;
    };

    const iconSize = getSizeByZoom(zoom);

    // ============================
    // Lấy vị trí hiện tại
    // ============================
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Ứng dụng cần quyền truy cập vị trí");
            return null;
        }

        let loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
        });

        return {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        };
    };

    // ============================
    // Load dữ liệu ban đầu
    // ============================
    useEffect(() => {
        const loadAll = async () => {
            const pos = await getCurrentLocation();
            if (pos) setCurrentPos(pos);

            const data = await getDetections();
            setDetections(data || []);
        };
        loadAll();
    }, []);

    // ============================
    // Search debounce
    // ============================
    useEffect(() => {
        if (search.length < 2) return;

        const delay = setTimeout(async () => {
            const data = await searchPlaces(search);
            setResults(data || []);
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);

    // ============================
    // Chọn địa điểm
    // ============================
    const handleSelectPlace = (item) => {
        const { lat, lon } = item.properties;

        setSelectedPlace({ lat, lng: lon });
        setResults([]);

        mapRef.current?.animateCamera({
            center: { latitude: lat, longitude: lon },
            zoom: 16,
        });

        Keyboard.dismiss();
    };

    // ============================
    // Routing
    // ============================
    const handleRouting = async () => {
        if (!currentPos || !selectedPlace) return;

        const poly = await getRoute(currentPos, selectedPlace);
        if (!poly) return;

        const coords = poly.map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
        }));

        setRouteLine(coords);
    };

    // ============================
    // Zoom tracking
    // ============================
    const handleRegionChange = (region, details) => {
        if (details?.zoomLevel) {
            setZoom(details.zoomLevel);
        }
    };

    // ============================
    // Detections → Heatmap points
    // ============================
    const heatmapPoints = detections.map((item) => ({
        latitude: item.objectLocation.lat,
        longitude: item.objectLocation.lng,
        weight: 1, // có thể thay = confidence / count
    }));

    return (
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                {/* Search bar */}
                <MapSearchBar value={search} onChange={setSearch} />

                {/* Kết quả tìm kiếm */}
                {results.length > 0 && (
                    <View style={styles.searchResults}>
                        <FlatList
                            keyboardShouldPersistTaps="handled"
                            data={results}
                            keyExtractor={(item) => item.properties.place_id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectPlace(item)}
                                    style={styles.resultItem}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                        {item.properties.address_line1 ||
                                            item.properties.formatted}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                {/* MAP */}
                <View style={{ flex: 1 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={mapRef}
                        style={StyleSheet.absoluteFillObject}
                        mapType="none"
                        onRegionChangeComplete={handleRegionChange}
                        initialRegion={{
                            latitude: currentPos?.latitude || 10.762622,
                            longitude: currentPos?.longitude || 106.660172,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <UrlTile
                            urlTemplate={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
                            maximumZ={19}
                        />

                        {/* HEATMAP – mật độ đối tượng */}
                        {zoom >= 11 && heatmapPoints.length > 0 && (
                            <Heatmap
                                points={heatmapPoints}
                                radius={40}
                                opacity={0.75}
                                gradient={{
                                    colors: ["#0000ff", "#00ffff", "#00ff00", "#ffff00", "#ff0000"],
                                    startPoints: [0.01, 0.25, 0.5, 0.75, 1],
                                    colorMapSize: 256,
                                }}
                            />
                        )}

                        {/* Marker vị trí hiện tại */}
                        {zoom >= 12 && currentPos && (
                            <Marker coordinate={currentPos}>
                                <Image
                                    source={require("../../assets/images/placeholder.png")}
                                    style={{ width: iconSize, height: iconSize }}
                                    resizeMode="contain"
                                />
                            </Marker>
                        )}

                        {/* Marker nơi chọn */}
                        {selectedPlace && (
                            <Marker
                                coordinate={{
                                    latitude: selectedPlace.lat,
                                    longitude: selectedPlace.lng,
                                }}
                                pinColor="red"
                            />
                        )}

                        {/* Route */}
                        {routeLine && (
                            <Polyline
                                coordinates={routeLine}
                                strokeWidth={5}
                                strokeColor="green"
                            />
                        )}
                    </MapView>
                </View>

                {/* Nút chỉ đường */}
                {selectedPlace && (
                    <TouchableOpacity onPress={handleRouting} style={styles.button}>
                        <Text style={styles.buttonText}>CHỈ ĐƯỜNG</Text>
                    </TouchableOpacity>
                )}

            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    searchResults: {
        position: "absolute",
        top: 95,
        left: 15,
        right: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 5,
        maxHeight: 300,
        zIndex: 999,
        elevation: 10,
    },
    resultItem: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "white",
    },
    button: {
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        backgroundColor: "#1e90ff",
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: "center",
        elevation: 5,
        zIndex: 5000,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
    },
});
