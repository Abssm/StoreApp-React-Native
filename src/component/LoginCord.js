// components/LoginCord.js
import { View, Text, TextInput } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../context/ThemeContext';

export default function LoginCord({
  username,
  setUsername,
  password,
  setPassword,
}) {
  const { theme } = useAppTheme();
  const isDark = theme.navigation.dark;

  return (
    <View>
      {/* Username label */}
      <Text style={[theme.typography.body, { fontSize: 20, color: theme.colors.subText, marginLeft: 20 }]}>
        Username
      </Text>

      {/* Username input */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 20,
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 10,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
      >
        <TextInput
          value={username}                 // controlled value
          onChangeText={setUsername}       // controlled setter
          placeholder="please enter your username"
          placeholderTextColor={isDark ? '#B3B3B3' : '#737070'}
          style={[theme.typography.body, { color: theme.colors.text, flex: 1 }]}
          autoCapitalize="none"
        />
        <Ionicons name="checkmark-outline" size={30} color="#06fd0ed6" style={{ paddingTop: 5 }} />
      </View>

      {/* Password label */}
      <Text style={[theme.typography.body, { fontSize: 20, color: theme.colors.subText, marginLeft: 20, marginTop: 14 }]}>
        Password
      </Text>

      {/* Password input */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 20,
          borderWidth: 0.5,
          padding: 10,
          borderRadius: 10,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
      >
        <TextInput
          value={password}                 // controlled value
          onChangeText={setPassword}       // controlled setter
          placeholder="please enter your password"
          placeholderTextColor={isDark ? '#B3B3B3' : '#737070'}
          style={[theme.typography.body, { color: theme.colors.text, flex: 1 }]}
          secureTextEntry
        />

        {/* Just UI text, not real password strength */}
        <Text style={[theme.typography.body, { fontSize: 16, color: '#06fd0ed6', paddingTop: 10 }]}>
          Strong
        </Text>
      </View>
    </View>
  );
}
