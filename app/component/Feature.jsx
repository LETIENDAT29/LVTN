import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { homeStyles as styles } from "../styles/homeStyles";

type FeatureProps = {
    icon: string;
    label: string;
    onPress?: () => void;
};

export function Feature({ icon, label, onPress }: FeatureProps) {
    return (
        <TouchableOpacity style={styles.featureBox} onPress={onPress}>
            <Ionicons name={icon} size={28} color="#1E90FF" />
            <Text style={styles.featureLabel}>{label}</Text>
        </TouchableOpacity>
    );
}
