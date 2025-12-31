import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../../app/(tabs)';
import ProfileScreen from '../../app/profile';
import LoginScreen from '../../app/screens/auth/loginscreen';


// 🧩 Khai báo type cho các route trong stack
export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Profile: undefined;
};

// ⚙️ Tạo Stack có type an toàn
const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

