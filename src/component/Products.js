import { View, Text, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { useWishlist } from '../context/WishlistContext';
import { useAppTheme } from '../context/ThemeContext';

export default function Products() {
  const navigation = useNavigation();

  const { theme } = useAppTheme();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/products')
      .then((res) => setProducts(res.data))
      .catch(console.log);
  }, []);

  const openProduct = (item) => {
    navigation.navigate('ProductCard', { product: item });
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => {
        const isLiked = isInWishlist(item.id);

        return (
          <Pressable
            style={{
              flex: 1,
              margin: 10,
              borderWidth: 1,
              borderColor: theme.colors.border,     // was: '#d2d2d2c2'
              backgroundColor: theme.colors.card,   // was: (none)
              borderRadius: 12,
              overflow: 'hidden',
            }}
            onPress={() => openProduct(item)}
          >
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 10,
              }}
              hitSlop={10}
              onPress={(e) => {
                e?.stopPropagation?.();
                toggleWishlist(item);
              }}
            >
              <Ionicons
                name={isLiked ? 'heart' : 'heart-outline'}
                size={30}
                color={isLiked ? '#fd0606d6' : theme.colors.text} // was: black
              />
            </Pressable>

            <Image
              source={{ uri: item.images?.[0] }}
              style={{
                width: '100%',
                height: 160,
                backgroundColor: theme.colors.bg, // was: '#f5f5f5'
              }}
              resizeMode="contain"
            />

            <View style={{ padding: 10 }}>
              <Text
                numberOfLines={2}
                style={[
                  theme.typography.body,            // was: fontSize only
                  { fontSize: 14, color: theme.colors.text },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  theme.typography.body,            // was: bold
                  { marginTop: 6, color: theme.colors.text, fontWeight: 'bold' },
                ]}
              >
                ${item.price}
              </Text>
            </View>
          </Pressable>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
