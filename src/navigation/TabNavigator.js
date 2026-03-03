import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAppTheme } from '../context/ThemeContext';

import Home from '../screens/homePage/Home';
import Wishlist from '../screens/wishlist/Wishlist';
import Cart from '../screens/cart/Cart';
import Payment from '../screens/payment/Payment';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('../../assets/images/home-button.png'),
  Wishlist: require('../../assets/images/wishlist.png'),
  Cart: require('../../assets/images/shopping-bag.png'),
  Payment: require('../../assets/images/wallet.png'),
};

export default function TabNavigator() {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },

        tabBarIcon: ({ focused, size }) => {
          if (focused) {
            return (
              <Text
                style={[
                  theme.typography.body,
                  {
                    color: theme.colors.primary,
                    fontSize: 16,
                    width: 80,
                    textAlign: 'center',
                  },
                ]}
              >
                {route.name}
              </Text>
            );
          }

          return (
            <Image
              source={icons[route.name]}
              style={{
                width: size,
                height: size,
                tintColor: theme.colors.subText, 
              }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Payment" component={Payment} />
    </Tab.Navigator>
  );
}
