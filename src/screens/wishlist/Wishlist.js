import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackButton from '../../component/BackButton';
import { useWishlist } from '../../context/WishlistContext';
import { useAppTheme } from '../../context/ThemeContext';

export default function Wishlist({ navigation }) {
  const { theme } = useAppTheme();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 }}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }} />
        <Text style={[theme.typography.subtitle, { fontSize: 18, fontWeight: '700', color: theme.colors.text }]}>
          Wishlist
        </Text>
        <View style={{ flex: 1 }} />
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
            No items in wishlist.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('ProductCard', { productId: item.id })}
            style={{
              flexDirection: 'row',
              backgroundColor: theme.colors.card,
              borderRadius: 14,
              padding: 12,
              marginBottom: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: theme.colors.bg,
              }}
              resizeMode="contain"
            />

            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text
                style={[theme.typography.body, { fontSize: 16, fontWeight: '700', color: theme.colors.text }]}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <Text style={[theme.typography.body, { marginTop: 6, color: theme.colors.subText }]}>
                ${item.price}
              </Text>
            </View>

            <Pressable onPress={() => removeFromWishlist(item.id)} style={{ padding: 8 }}>
              <Ionicons name="heart" size={22} color={theme.colors.primary} />
            </Pressable>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
