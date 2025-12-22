import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🧭 Hàm đăng xuất chung (dùng lại cho cả lỗi token & nút logout)
    const logoutAndRedirect = async (message) => {
        await AsyncStorage.removeItem('accessToken');
        if (message) Alert.alert('Thông báo', message);
        setTimeout(() => router.replace('/screens/auth/loginscreen'), 300);
    };

    // 📦 Lấy dữ liệu người dùng từ API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');

                if (!accessToken) {
                    await logoutAndRedirect('Không tìm thấy token, vui lòng đăng nhập lại.');
                    return;
                }

                const userData = await getProfile(accessToken);

                if (!userData || !userData.id) {
                    await logoutAndRedirect('Token không hợp lệ hoặc người dùng không tồn tại.');
                    return;
                }

                setUser(userData);
            } catch (error) {
                console.log('Lỗi khi tải profile:', error);
                await logoutAndRedirect('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 🧭 Hàm xử lý khi người dùng nhấn đăng xuất
    const handleLogout = async () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Đăng xuất',
                style: 'destructive',
                onPress: async () => {
                    await logoutAndRedirect('Đã đăng xuất thành công.');
                },
            },
        ]);
    };

    // Hiển thị khi đang tải
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Đang tải thông tin...</Text>
            </View>
        );
    }

    // Hiển thị khi không có dữ liệu user
    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Không tìm thấy thông tin người dùng.</Text>
            </View>
        );
    }

    // Hiển thị giao diện chính
    return (
        <View style={styles.container}>
            {/* Ảnh đại diện */}
            <Image source={{ uri: user.avatar }} style={styles.avatar} />

            {/* Tên người dùng */}
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.role}>{user.role?.toUpperCase()}</Text>

            {/* Thông tin chi tiết */}
            <View style={styles.infoBox}>
                <Ionicons name="call-outline" size={20} color="#007AFF" />
                <Text style={styles.infoText}>{user.phone}</Text>
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="mail-outline" size={20} color="#007AFF" />
                <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="location-outline" size={20} color="#007AFF" />
                <Text style={styles.infoText}>{user.address}</Text>
            </View>

            {/* Nút đăng xuất */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 40,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#333',
    },
    role: {
        fontSize: 14,
        color: '#007AFF',
        marginBottom: 25,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF3B30',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 30,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
