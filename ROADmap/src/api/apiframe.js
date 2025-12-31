import { API_URL } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getDetections = async () => {
    try {
        // Lấy token (nếu API yêu cầu xác thực)
        const accessToken = await AsyncStorage.getItem('accessToken');

        // Gửi request GET
        const response = await axios.get(`${API_URL}/detections`, {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                'Content-Type': 'application/json'
            }
        });
        return response.data; // Trả về danh sách detections
    } catch (error) {
        console.error('❌ Lỗi khi lấy detections:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Không thể lấy danh sách detections');
    }
};
