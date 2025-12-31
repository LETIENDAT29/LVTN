import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const API_URL = "http://192.168.1.87:3000/api/cameras";
// 👉 NHỚ thay IP bằng IP của backend máy bạn.

export default function CameraScreen({ navigation }) {
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = async () => {
        try {
            const res = await axios.get(API_URL);
            setCameras(res.data.cameras);
        } catch (err) {
            console.log("Error fetching cameras:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Đang tải camera...</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CameraDetail", { camera: item })}
        >
            <Text style={styles.title}>{item.name}</Text>

            {/* SNAPSHOT IMAGE */}
            <Image
                source={{ uri: `${item.snapshot}?t=${Date.now()}` }} // tránh cache
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.coords}>
                📍 {item.lat}, {item.lng}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cameras}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        backgroundColor: "#fff",
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    coords: {
        marginTop: 6,
        fontSize: 12,
        color: "#777",
    }
});
