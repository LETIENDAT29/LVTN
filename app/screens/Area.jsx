import { StyleSheet, Text, View } from "react-native";

export default function Area() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Khu vực</Text>
            <Text style={styles.subtitle}>Quản lý và xem danh sách khu vực.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
    },
});

