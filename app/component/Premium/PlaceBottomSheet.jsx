import { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    Text,
    View
} from "react-native";

const { height } = Dimensions.get("window");

// Vị trí bật lên và nằm dưới
const SNAP_TOP = height * 0.25;
const SNAP_BOTTOM = height * 0.75;

export default function PlaceBottomSheet({ place, onClose }) {
    console.log("PlaceBottomSheet place:", place);

    // Giá trị animation theo trục Y
    const pan = useRef(new Animated.Value(SNAP_BOTTOM)).current;

    // Khi place thay đổi → bật sheet lên
    useEffect(() => {
        if (place) {
            Animated.spring(pan, {
                toValue: SNAP_TOP,
                useNativeDriver: false,
            }).start();
        } else {
            // Khi đóng → kéo xuống
            Animated.spring(pan, {
                toValue: SNAP_BOTTOM,
                useNativeDriver: false,
            }).start();
        }
    }, [place]);

    // Pan gesture để kéo lên/xuống
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,

            onPanResponderMove: (_, gesture) => {
                const newY = pan._value + gesture.dy;

                // Giới hạn không cho kéo quá cao hoặc quá thấp
                if (newY < SNAP_TOP - 20 || newY > SNAP_BOTTOM + 20) return;

                pan.setValue(newY);
            },

            onPanResponderRelease: (_, gesture) => {
                // Kéo xuống sâu → đóng
                if (gesture.dy > 100) {
                    Animated.spring(pan, {
                        toValue: SNAP_BOTTOM,
                        useNativeDriver: false,
                    }).start(() => onClose());
                } else {
                    // Bật lại lên
                    Animated.spring(pan, {
                        toValue: SNAP_TOP,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    // ✨ KHÔNG return null nữa → giữ component trong cây để animation hoạt động
    const isVisible = !!place;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            pointerEvents={isVisible ? "auto" : "none"}
            style={[
                styles.sheet,
                {
                    opacity: isVisible ? 1 : 0, // Ẩn hiện mềm mại
                    transform: [{ translateY: pan }],
                }
            ]}
        >
            <View style={styles.handleBar} />

            {place && (
                <>
                    <Text style={styles.title} numberOfLines={1}>
                        {place.properties.address_line1 || place.properties.formatted}
                    </Text>

                    <Text style={styles.subText}>
                        {place.properties.address_line2}
                    </Text>

                    {place.properties.city && (
                        <Text style={styles.subText}>
                            {place.properties.city}, {place.properties.country}
                        </Text>
                    )}
                </>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: height,     // ❗ full screen
        justifyContent: "flex-end",
        zIndex: 999999,
        elevation: 999999,
    },
    handleBar: {
        width: 45,
        height: 6,
        backgroundColor: "#ccc",
        borderRadius: 6,
        alignSelf: "center",
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    subText: {
        fontSize: 15,
        color: "#666",
        marginTop: 3,
    },
    button: {
        position: "absolute",
        bottom: 40,
        left: 20,
        right: 20,
        zIndex: 5000,
    }
});
