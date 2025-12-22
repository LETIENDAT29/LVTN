import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

interface PetSuggestionsProps {
    data: string[];
    onSelect?: (pet: string) => void;
}

export default function PetSuggestions({ data, onSelect }: PetSuggestionsProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
            {data.map((pet, index) => (
                <TouchableOpacity
                    key={index}
                    style={{
                        backgroundColor: '#eaf3ff',
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        marginRight: 8,
                    }}
                    onPress={() => onSelect?.(pet)}
                >
                    <Text style={{ color: '#007AFF', fontWeight: '600' }}>{pet}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
