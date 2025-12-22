import { StyleSheet, Text, View } from "react-native";

export default function Analytics() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phân tích</Text>
            <Text style={styles.subtitle}>Biểu đồ và thống kê dữ liệu.</Text>
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
