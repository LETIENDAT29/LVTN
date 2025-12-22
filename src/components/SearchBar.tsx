import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f1f1f1',
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 8,
        }}>
            <Ionicons name="search" size={20} color="#555" style={{ marginRight: 8 }} />
            <TextInput
                style={{ flex: 1, fontSize: 16 }}
                placeholder={placeholder || 'Tìm kiếm...'}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}
