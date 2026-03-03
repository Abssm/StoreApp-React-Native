import React from 'react';
import { Pressable, Text } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function MyButton({ title, onPress }) {
  const { theme } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '95%',
        height: 50,
        backgroundColor: theme.colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={[
          theme.typography.body,
          {
            fontSize: 20,
            textAlign: 'center',
            color: theme.navigation.dark ? '#fff' : '#000',
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
