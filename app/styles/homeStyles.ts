// app/styles/homeStyles.ts
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },

    // Logo
    logoContainer: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 20,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1E90FF",
    },

    // Search
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    searchInput: {
        marginLeft: 10,
        fontSize: 16,
        flex: 1,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 25,
        marginBottom: 10,
    },

    // Grid
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    featureBox: {
        width: "24%",
        backgroundColor: "#f5f7f9ff",
        borderRadius: 14,
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },
    featureLabel: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 6,
        textAlign: "center",
    },

    // Poster
    poster: {
        width: "100%",
        height: 160,
        borderRadius: 14,
        marginBottom: 14,
        marginTop: 4,
    },
});
