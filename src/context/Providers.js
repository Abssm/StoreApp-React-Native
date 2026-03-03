import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider, useAppTheme } from './ThemeContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

function NavWithTheme({ children }) {
  const { theme } = useAppTheme();
  return <NavigationContainer theme={theme.navigation}>{children}</NavigationContainer>;
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <NavWithTheme>{children}</NavWithTheme>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
