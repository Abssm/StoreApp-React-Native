import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useAppTheme } from '../../context/ThemeContext'; 
import Categories from '../../component/Categories';
import Products from '../../component/Products';

/**
 * Home screen component
 *
 * This component is the main entry point for the application. It provides navigation to the
 * categories and products screens.
 *
 * @param {navigation} Navigation object
 */
export default function Home({ navigation }) {
  
  const { theme, cycleTheme } = useAppTheme();

  return (
   
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
   
      <View style={{ flex: 1.5 }}>
       
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 20,
            marginTop: 10,
          }}
        >
     
          <Pressable onPress={cycleTheme} style={{ marginRight: 14 }}>
           <Ionicons name="color-filter-outline" size={30} color={theme.colors.text} />    
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="bag-outline" size={30} color={theme.colors.text} />
          </Pressable>
        </View>

      
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={[theme.typography.title, { color: theme.colors.text }]}>
            Hello
          </Text>

          <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
            Welcome to Laza
          </Text>
        </View>
      </View>

      {/* Categories section */}
      <View style={{ flex: 1 }}>
        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.colors.text, marginLeft: 20 },
          ]}
        >
          Choose Category
        </Text>

        <Categories />
      </View>

    
      <View style={{ flex: 4 }}>
        <Text
          style={[
            theme.typography.subtitle,
            { color: theme.colors.text, marginLeft: 20 },
          ]}
        >
          All Products
        </Text>

        <Products />
      </View>

    
    </SafeAreaView>
  );
}
