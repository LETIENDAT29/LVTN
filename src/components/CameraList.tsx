import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

interface Camera {
    id: number;
    name: string;
    image: string;
}

interface CameraListProps {
    data: Camera[];
}

export default function CameraList({ data }: CameraListProps) {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {data.map((cam) => (
                <View key={cam.id} style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: 12,
                    marginBottom: 16,
                    overflow: 'hidden',
                }}>
                    <Image source={{ uri: cam.image }} style={{ width: '100%', height: 180 }} />
                    <Text style={{ padding: 10, fontSize: 16, fontWeight: '600' }}>{cam.name}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
