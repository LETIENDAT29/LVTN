import { getProfile } from '@/api/apiUser';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feature } from 'app/component/Feature';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView style={styles.container}>

      {/* 🏁 LOGO */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          ROAD
          <Text style={{ fontWeight: '900' }}>Map</Text>
        </Text>
      </View>

      {/* 🔍 Thanh tìm kiếm */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm khu vực, camera, sự kiện..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 🧭 Grid chức năng */}
      <Text style={styles.sectionTitle}>Chức năng</Text>

      <View style={styles.grid}>
        <Feature
          icon="location"
          label="Khu vực"
          styles={styles}
          onPress={() => router.push("/screens/Area")}
        />
        <Feature
          icon="map"
          label="Bản đồ"
          styles={styles}
          onPress={() => router.push("/Premium")}
        />
        <Feature
          icon="camera"
          label="Camera"
          styles={styles}
          onPress={() => router.push("/screens/Camera")}
        />
        <Feature
          icon="time"
          label="Lịch sử"
          styles={styles}
          onPress={() => router.push("/screens/History")}
        />
        <Feature
          icon="alert-circle"
          label="Cảnh báo"
          styles={styles}
          onPress={() => router.push("/screens/Alert")}
        />
        <Feature
          icon="git-network"
          label="Giao thông"
          styles={styles}
          onPress={() => router.push("/screens/Traffic")}
        />
        <Feature
          icon="stats-chart"
          label="Phân tích"
          styles={styles}
          onPress={() => router.push("/screens/Analytics")}
        />
        <Feature
          icon="settings"
          label="Cài đặt"
          styles={styles}
          onPress={() => router.push("Settings")}
        />
      </View>


      {/* 🎉 Poster sự kiện */}
      <Text style={styles.sectionTitle}>Sự kiện nổi bật</Text>

      <Image
        source={require("../../assets/images/scam_cellphones.png")}
        style={styles.poster}
      />
      <Image
        source={require("../../assets/images/scam_cellphones.png")}
        style={styles.poster}
      />

    </ScrollView>
  );
}

// /* 🔹 Component Feature (icon + label) */
// const Feature = ({ icon, label }) => (
//   <TouchableOpacity style={styles.featureBox}>
//     <Ionicons name={icon} size={28} color="#1E90FF" />
//     <Text style={styles.featureLabel}>{label}</Text>
//   </TouchableOpacity>
// );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  // Logo
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#338de6ff',
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
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
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    width: '24%',
    backgroundColor: '#E9F3FF',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  featureLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },

  // Poster
  poster: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    marginBottom: 14,
    marginTop: 4,
  }
});
