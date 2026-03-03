import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import { useAppTheme } from '../context/ThemeContext'; 

export default function Categories() {
  const navigation = useNavigation();
  const { theme } = useAppTheme();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '75%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
      }}
    >
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryProducts', {
                categoryId: item.id,
                categoryName: item.name,
              })
            }
            style={{
              width: 160,
              height: 45,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: theme.colors.card,
              borderRadius: 12,
              borderColor: theme.colors.border,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                marginRight: 20,
                backgroundColor: theme.colors.bg,
              }}
              resizeMode="contain"
            />

            <Text style={[theme.typography.body, { fontSize: 18, color: theme.colors.text, textAlign:'center'}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
