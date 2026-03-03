import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppTheme } from '../context/ThemeContext'; 

export default function ProductInCart() {
  const { theme } = useAppTheme();

  return (
    <View style={{ flex: 1, margin: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.colors.card,
          borderRadius: 14,
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: theme.colors.border,
        }}
      >
        <Image
          source={require('../../assets/images/IMG.png')}
          style={{
            width: 160,
            height: 160,
            borderRadius: 12,
            backgroundColor: theme.colors.bg,
          }}
          resizeMode="contain"
        />

        <View style={{ flex: 1, paddingLeft: 16 }}>
          <Text style={[theme.typography.subtitle, { color: theme.colors.text }]}>
            Product Name
          </Text>

          <Text style={[theme.typography.body, { color: theme.colors.subText, marginTop: 4 }]}>
            $45 (-$4.00 Tax)
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 40 }}>
            <Pressable>
              <Ionicons
                name="chevron-down-circle-outline"
                size={28}
                color={theme.colors.subText}
              />
            </Pressable>

            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.text, fontWeight: '700', marginHorizontal: 12 },
              ]}
            >
              1
            </Text>

            <Pressable>
              <Ionicons
                name="chevron-up-circle-outline"
                size={28}
                color={theme.colors.subText}
              />
            </Pressable>

            <Pressable style={{ padding: 8, paddingLeft: 50 }}>
              <Ionicons name="trash-outline" size={22} color={theme.colors.subText} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
