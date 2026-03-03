import React, { createContext, useContext, useState } from 'react';
import { typography } from '../typography/typography';

const ThemeContext = createContext(null);

const NAV_FONTS = {
  regular: { fontFamily: 'Inter_18pt-Regular', fontWeight: '400' },
  medium: { fontFamily: 'Inter_24pt-Medium', fontWeight: '500' },
  bold: { fontFamily: 'Inter_28pt-SemiBold', fontWeight: '600' },
  heavy: { fontFamily: 'Inter_28pt-Bold', fontWeight: '800' },
};

const makeTheme = ({ key, dark, primary }) => {
  const isDark = !!dark;

  const colors = isDark
    ? {
        bg: '#0E0E10',
        text: '#FFFFFF',
        subText: '#B3B3B3',
        card: '#1A1A1E',
        border: '#2A2A2F',
        primary,
      }
    : {
        bg: '#FFFFFF',
        text: '#111111',
        subText: '#777777',
        card: '#F7F7F7',
        border: '#E5E5E5',
        primary,
      };

  return {
    key,
    colors,
    typography, 
    navigation: {
      dark: isDark,
      fonts: NAV_FONTS, 
      colors: {
        primary: colors.primary,
        background: colors.bg,
        card: colors.card,
        text: colors.text,
        border: colors.border,
        notification: colors.primary,
      },
    },
  };
};

const THEMES = {
  default: makeTheme({ key: 'default', dark: false, primary: '#9775FA' }),
  dark: makeTheme({ key: 'dark', dark: true, primary: '#9775FA' }),
  blue: makeTheme({ key: 'blue', dark: false, primary: '#46B5FF' }),
};

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('default');
  const theme = THEMES[themeKey] || THEMES.default;

  const setTheme = (key) => setThemeKey(key);

  const cycleTheme = () => {
    setThemeKey((prev) => {
      if (prev === 'default') return 'dark';
      if (prev === 'dark') return 'blue';
      return 'default';
    });
  };

  return (
    <ThemeContext.Provider value={{ themeKey, theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
