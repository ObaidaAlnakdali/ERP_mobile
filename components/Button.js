import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

function Button() {
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={{ backgroundColor: colors.card }}>
            <Text style={{ color: colors.text }}>Button!</Text>
        </TouchableOpacity>)
}

export default Button