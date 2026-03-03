import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { DotIndicator } from 'react-native-indicators';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../context/ThemeContext';

export default function SplashScreen({ navigation }) {
  const { theme } = useAppTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary, 
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 10, justifyContent: 'center' }}>
        <Text
          style={[
            theme.typography.title,
            { fontSize: 60, color: theme.colors.onPrimary, textAlign: 'center', fontWeight: '800' },
          ]}
        >
          Laza
        </Text>

        <Text
          style={[
            theme.typography.body,
            { fontSize: 20, color: theme.colors.onPrimaryMuted, textAlign: 'center' },
          ]}
        >
          Welcome to The Store
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DotIndicator
          color={theme.colors.onPrimaryDim}
          size={10}
          count={6}
          marginBottom={600}
        />
      </View>
    </SafeAreaView>
  );
}
