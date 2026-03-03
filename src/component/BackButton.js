import React from 'react';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BackButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: 80, height: 50, alignItems: 'center', justifyContent: 'center' }}
    >
      <Ionicons name="arrow-back-outline" size={30} color="black" />
    </Pressable>
  );
}
