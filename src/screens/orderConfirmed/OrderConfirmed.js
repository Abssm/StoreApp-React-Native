import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../component/BackButton';
import { useAppTheme } from '../../context/ThemeContext';

export default function OrderConfirmed({ navigation }) {
  const { theme } = useAppTheme();

  const onContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../../../assets/images/order_confirmed.png')}
          style={{ width: 240, height: 240, marginBottom: 18 }}
          resizeMode="contain"
        />

        <Text
          style={[
            theme.typography.subtitle,
            { fontSize: 24, fontWeight: '700', textAlign: 'center', color: theme.colors.text },
          ]}
        >
          Order Confirmed!
        </Text>

        <Text
          style={[
            theme.typography.body,
            {
              marginTop: 10,
              color: theme.colors.subText,
              textAlign: 'center',
              lineHeight: 20,
            },
          ]}
        >
          Your order has been confirmed, we will send you confirmation email shortly.
        </Text>

        {/* Go to Orders (disabled look) */}
        <View
          style={{
            marginTop: 24,
            width: '100%',
            backgroundColor: theme.colors.card,
            borderRadius: 14,
            paddingVertical: 16,
            alignItems: 'center',
            opacity: 0.7,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={[theme.typography.body, { color: theme.colors.subText, fontWeight: '700' }]}>
            Go to Orders
          </Text>
        </View>
      </View>

      {/* Bottom button */}
      <View style={{ padding: 16 }}>
        <Pressable
          onPress={onContinueShopping}
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: 'center',
          }}
        >
          <Text style={[theme.typography.body, { color: '#fff', fontWeight: '700', fontSize: 16 }]}>
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
