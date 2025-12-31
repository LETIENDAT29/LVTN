import { StyleSheet, Text, View } from "react-native";

export default function History() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch sử</Text>
            <Text style={styles.subtitle}>Các sự kiện đã ghi nhận.</Text>
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
