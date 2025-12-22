import { getDetections } from "@/api/apiObject";
import { getRoute } from "@/api/routes";
import { searchPlaces } from "@/api/search";
import MapSearchBar from "app/component/Premium/MapSearchBar";
import RouteInfoBottomSheet from "app/component/RouteInfoBottomSheet";

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
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

const GEOAPIFY_API_KEY = "ba69320829164f7bab168960aaa8ca1e";

export default function MapScreen() {
  const mapRef = useRef(null);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [currentPos, setCurrentPos] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [routeLine, setRouteLine] = useState(null);
  const [detections, setDetections] = useState([]);
  const [bottomSheetPlace, setBottomSheetPlace] = useState(null);
  const [routeDetections, setRouteDetections] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);


  // NEW: lưu mức zoom
  const [zoom, setZoom] = useState(15);

  // NEW: thay đổi size icon tùy zoom
  const getSizeByZoom = (zoomLevel) => {
    if (zoomLevel < 13) return 20;
    if (zoomLevel < 15) return 30;
    return 40;
  };
  const isPointNearRoute = (point, route, threshold = 0.0003) => {
    return route.some(
      (p) =>
        Math.abs(p.latitude - point.lat) < threshold &&
        Math.abs(p.longitude - point.lng) < threshold
    );
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

  const getIconByLabel = (label) => {
    switch (label) {
      case "Cam con lai":
        return require("../../assets/images/traffic-signal.png");
      case "Cam dung va do":
        return require("../../assets/images/no-stopping.png");
      case "Cam nguoc chieu":
        return require("../../assets/images/stop-sign.png");
      case "Cam re":
        return require("../../assets/images/no-turn-right.png");
      case "Gioi han toc do":
        return require("../../assets/images/speed-limit.png");
      case "Hieu lenh":
        return require("../../assets/images/command.png");
      case "Nguy hiem":
        return require("../../assets/images/warning.png");
      case "rubbish":
        return require("../../assets/images/garbage.png");

      default:
        return require("../../assets/images/road-sign.png");
    }
  };

  // ============================
  // load khi mở app
  // ============================
  useEffect(() => {
    const loadAll = async () => {
      const pos = await getCurrentLocation();
      if (pos) setCurrentPos(pos);

      const data = await getDetections();
      setDetections(data);
    };
    loadAll();
  }, []);

  // ============================
  // Tìm kiếm debounce
  // ============================
  useEffect(() => {
    if (search.length < 2) return;

    const delay = setTimeout(async () => {
      const data = await searchPlaces(search);
      setResults(data);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  // ============================
  // Chọn địa điểm
  // ============================
  const handleSelectPlace = (item) => {
    const { lat, lon } = item.properties;

    setSelectedPlace({ lat, lng: lon });
    setBottomSheetPlace(item);

    setResults([]);

    mapRef.current?.animateCamera({
      center: { latitude: lat, longitude: lon },
      zoom: 16,
    });

    Keyboard.dismiss();
  };

  // ============================
  // Chỉ đường
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

    // ✅ lọc detection nằm trên route
    const matched = detections.filter((d) =>
      isPointNearRoute(d.objectLocation, coords)
    );

    setRouteDetections(matched);
    setShowBottomSheet(true);
  };


  // NEW: lấy zoom khi map thay đổi
  const handleRegionChange = (region, details) => {
    if (details?.zoomLevel) {
      setZoom(details.zoomLevel);
    }
  };

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
                    {item.properties.address_line1 || item.properties.formatted}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* MAP */}
        <View style={{ flex: 1 }}>
          <MapView
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

            {/* ẨN marker nếu zoom < 12 */}
            {zoom >= 12 && currentPos && (
              <Marker coordinate={currentPos}>
                <Image
                  source={require("../../assets/images/placeholder.png")}
                  style={{ width: iconSize, height: iconSize }}
                  resizeMode="contain"
                />
              </Marker>
            )}

            {/* ẨN marker API khi zoom < 12 */}
            {zoom >= 12 &&
              detections.map((item) => (
                <Marker
                  key={item._id}
                  coordinate={{
                    latitude: item.objectLocation.lat,
                    longitude: item.objectLocation.lng,
                  }}
                  title={item.label}
                >
                  <Image
                    source={getIconByLabel(item.label)}
                    style={{ width: iconSize, height: iconSize }}
                    resizeMode="contain"
                  />
                </Marker>
              ))}

            {/* Marker nơi bạn chọn (nên luôn hiển thị, KHÔNG ẩn) */}
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

        {/* Bottom sheet */}
        {/* <PlaceBottomSheet
          place={bottomSheetPlace}
          onClose={() => setBottomSheetPlace(null)}
        /> */}

        {showBottomSheet && (
          <RouteInfoBottomSheet
            detections={routeDetections}
            onClose={() => setShowBottomSheet(false)}
          />
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
