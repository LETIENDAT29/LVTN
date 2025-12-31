import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../config'; // import đường dẫn API của bạn

export const loginUser = async (phone, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
    const { accessToken, user } = response.data;
    if (accessToken) {
      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
    }
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
  }
};

const getToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const getProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi lấy thông tin người dùng:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('Lỗi đăng xuất:', error.response?.data || error.message);
    throw new Error('Đăng xuất thất bại');
  }
};
