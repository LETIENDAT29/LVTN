import { Image, StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";

export default function CameraDetail({ route }) {
    const { camera } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{camera.name}</Text>

            {camera.stream ? (
                <Video
                    source={{ uri: camera.stream }}
                    style={styles.video}
                    controls
                    resizeMode="contain"
                />
            ) : (
                <Image
                    source={{ uri: `${camera.snapshot}?t=${Date.now()}` }}
                    style={styles.image}
                />
            )}

            <Text style={styles.coords}>
                📍 {camera.lat}, {camera.lng}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    image: { width: "100%", height: 300, borderRadius: 10 },
    video: { width: "100%", height: 300 },
    coords: { marginTop: 10, color: "#666" }
});
