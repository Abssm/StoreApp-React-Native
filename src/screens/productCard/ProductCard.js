import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyButton from '../../component/MyButton';
import BackButton from '../../component/BackButton';
import { useCart } from '../../context/CartContext';
import { useAppTheme } from '../../context/ThemeContext';

export default function ProductCard({ navigation, route }) {
  const { theme } = useAppTheme();

  const product = route?.params?.product;
  const { addToCart } = useCart();

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.bg }}>
        <Text style={[theme.typography.body, { color: theme.colors.text }]}>No product data received.</Text>
      </SafeAreaView>
    );
  }

  const thumbs = (product.images || []).slice(0, 4);
  const [selected, setSelected] = useState(thumbs[0]);

  useEffect(() => {
    setSelected(thumbs[0]);
  }, [product?.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10 }}>
          <BackButton onPress={() => navigation.goBack()} />

          <View style={{ flex: 1 }} />

          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.colors.card,
              borderWidth: 1,
              borderColor: theme.colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="bag-outline" size={30} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>

        <Image
          style={{
            width: '100%',
            height: 320,
            backgroundColor: theme.colors.card,
            marginTop: 10,
          }}
          source={selected ? { uri: selected } : null}
          resizeMode="contain"
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 12 }}>
          <Text style={[theme.typography.body, { fontSize: 13, color: theme.colors.subText }]}>
            {product.category?.name ?? ''}
          </Text>
          <Text style={[theme.typography.body, { fontSize: 13, color: theme.colors.subText }]}>Price</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 6 }}>
          <Text
            numberOfLines={2}
            style={[
              theme.typography.title,
              { fontSize: 24, fontWeight: '700', flex: 1, paddingRight: 12, color: theme.colors.text },
            ]}
          >
            {product.title}
          </Text>

          <Text style={[theme.typography.title, { fontSize: 22, fontWeight: '700', color: theme.colors.text }]}>
            ${product.price}
          </Text>
        </View>

        <FlatList
          data={thumbs}
          horizontal
          keyExtractor={(url, i) => `${url}-${i}`}
          showsHorizontalScrollIndicator={false}
          style={{ height: 86, marginTop: 10 }}
          contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
          renderItem={({ item: url }) => {
            const active = url === selected;

            return (
              <Pressable
                onPress={() => setSelected(url)}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  marginRight: 12,
                  borderWidth: active ? 2 : 1,
                  borderColor: active ? theme.colors.primary : theme.colors.border,
                  backgroundColor: theme.colors.card,
                  overflow: 'hidden',
                }}
              >
                <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </Pressable>
            );
          }}
        />

        <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
          <Text style={[theme.typography.subtitle, { fontSize: 18, fontWeight: '700', color: theme.colors.text }]}>
            Description
          </Text>

          <Text
            style={[theme.typography.body, { marginTop: 8, color: theme.colors.subText, lineHeight: 20 }]}
            numberOfLines={4}
          >
            {product.description}
            <Text style={{ fontWeight: '700', color: theme.colors.text }}> Read More..</Text>
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 18 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <View>
              <Text style={[theme.typography.subtitle, { fontSize: 18, fontWeight: '700', color: theme.colors.text }]}>
                Total Price
              </Text>
              <Text style={[theme.typography.body, { marginTop: 2, fontSize: 12, color: theme.colors.subText }]}>
                with VAT,SD
              </Text>
            </View>

            <Text style={[theme.typography.title, { fontSize: 22, fontWeight: '700', color: theme.colors.text }]}>
              ${product.price + 5}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          backgroundColor: theme.colors.bg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <MyButton
          title="Add to Cart"
          onPress={() => {
            addToCart(product);
            navigation.navigate('MainTabs');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
