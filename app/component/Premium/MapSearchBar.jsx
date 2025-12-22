import { StyleSheet, TextInput, View } from "react-native";

export default function MapSearchBar({ value, onChange }) {
    return (
        <View style={styles.box}>
            <TextInput
                placeholder="Tìm địa điểm..."
                value={value}
                onChangeText={onChange}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        position: "absolute",
        top: 40,
        left: 10,
        right: 10,
        backgroundColor: "white",
        padding: 8,
        borderRadius: 10,
        zIndex: 999,
    },
    input: {
        fontSize: 16,
    }
});
