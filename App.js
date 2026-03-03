import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Providers from './src/context/Providers';

import SplashScreen from './src/screens/splash/SplashScreen';
import Welcome from './src/screens/WelcomeScreen/Welcome';
import SignUp from './src/screens/Signup/SignUp';
import ForgetPassword from './src/screens/forgetPassword/ForgetPassword';
import VerificationScreen from './src/screens/Verification/VerificationScreen';
import NewPassword from './src/screens/newPasswordScreen/NewPassword';

import TabNavigator from './src/navigation/TabNavigator';

import ProductCard from './src/screens/productCard/ProductCard';
import CategoryProducts from './src/screens/categoryProducts/CategoryProducts';
import Address from './src/screens/address/Address';
import Payment from './src/screens/payment/Payment';
import OrderConfirmed from './src/screens/orderConfirmed/OrderConfirmed';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
          <Stack.Screen name="NewPassword" component={NewPassword} />

          <Stack.Screen name="MainTabs" component={TabNavigator} />

          <Stack.Screen name="ProductCard" component={ProductCard} />
          <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />
        </Stack.Navigator>
      </Providers>
    </GestureHandlerRootView>
  );
}
