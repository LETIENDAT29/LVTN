import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderBarProps {
    title: string;
    userName?: string; // 👈 thêm tên người dùng
    onProfilePress?: () => void;
    onNotificationPress?: () => void;
}

export default function HeaderBar({
    title,
    userName,
    onProfilePress,
    onNotificationPress,
}: HeaderBarProps) {
    const router = useRouter();

    // 🧩 Chỉ lấy 1 từ đầu tiên trong tên
    const shortName = userName ? userName.split(' ')[0] : '';

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
                paddingHorizontal: 16,
            }}
        >
            {/* 🔹 Tiêu đề */}
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#007AFF' }}>
                {title}
            </Text>

            {/* 🔹 Nhóm icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* <TouchableOpacity onPress={onNotificationPress} style={{ marginLeft: 12 }}>
                    <Ionicons name="notifications-outline" size={26} color="#333" />
                </TouchableOpacity> */}

                <TouchableOpacity
                    onPress={onProfilePress || (() => router.push('/profile'))}
                    style={{ alignItems: 'center', marginLeft: 12 }}
                >
                    <Ionicons name="person-circle-outline" size={28} color="#333" />
                    {shortName ? (
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#333',
                                marginTop: 2,
                                textAlign: 'center',
                                maxWidth: 60,
                            }}
                            numberOfLines={1}
                        >
                            {shortName}
                        </Text>
                    ) : null}
                </TouchableOpacity>
            </View>
        </View>
    );
}
