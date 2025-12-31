import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RouteInfoBottomSheet({ detections, onClose }) {
    return (
        <View style={styles.container}>
            <View style={styles.sheet}>
                <Text style={styles.title}>Thông tin tuyến đường</Text>

                <Text style={styles.text}>
                    🚧 Số chướng ngại vật / biển báo:
                </Text>

                <Text style={styles.count}>{detections.length}</Text>

                <TouchableOpacity onPress={onClose} style={styles.btn}>
                    <Text style={styles.btnText}>Đóng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
    },
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
    count: {
        fontSize: 32,
        fontWeight: "800",
        color: "#ff4500",
        marginVertical: 10,
    },
    btn: {
        backgroundColor: "#1e90ff",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
