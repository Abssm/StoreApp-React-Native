import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackButton from '../../component/BackButton';
import { useAppTheme } from '../../context/ThemeContext';

export default function CategoryProducts({ route, navigation }) {
  const { theme } = useAppTheme();

  const { categoryId, categoryName } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg, paddingTop: 30 }}>
      {/* Header */}
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.colors.text, fontSize: 22, fontWeight: '700', marginRight: 30, paddingTop: 10 },
          ]}
        >
          {categoryName || 'Category'}
        </Text>

        <Pressable
          onPress={() => {
            navigation.navigate('Cart');
          }}
          style={{ marginRight: 20, paddingTop: 10 }}
        >
          <Ionicons name="bag-outline" size={30} color={theme.colors.text} />
        </Pressable>
      </View>

      {/* Body */}
      {loading ? (
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[theme.typography.title, { color: theme.colors.text, fontSize: 30 }]}>
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                margin: 10,
                borderWidth: 1,
                borderColor: theme.colors.border,     // was: '#ddd'
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: theme.colors.card,    // added for dark mode
              }}
              onPress={() => navigation.navigate('ProductCard', { product: item })}
            >
              <Image
                source={{ uri: item.images?.[0] }}
                style={{
                  width: '100%',
                  height: 160,
                  backgroundColor: theme.colors.bg,    // was: '#f5f5f5'
                }}
                resizeMode="contain"
              />

              <View style={{ padding: 10 }}>
                <Text
                  numberOfLines={2}
                  style={[theme.typography.body, { color: theme.colors.text }]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    theme.typography.body,
                    { marginTop: 6, color: theme.colors.text, fontWeight: '700' },
                  ]}
                >
                  ${item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
