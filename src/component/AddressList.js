import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { useAppTheme } from '../context/ThemeContext';

export default function AddressList({ navigation, onClose }) {
  const { theme } = useAppTheme();
  const { addresses, selectedAddressId, selectAddress, removeAddress } = useCart();

  return (
    <View style={{ padding: 16, backgroundColor: theme.colors.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={[theme.typography.subtitle, { color: theme.colors.text, fontWeight: '700' }]}>
          Addresses
        </Text>

        <Pressable onPress={onClose}>
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </Pressable>
      </View>

      {/* Add new address */}
      <Pressable
        onPress={() => navigation.navigate('Address')}
        style={{
          marginTop: 14,
          padding: 14,
          borderRadius: 12,
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          alignItems: 'center',
        }}
      >
        <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]}>
          + Add new address
        </Text>
      </Pressable>

      {/* Addresses list */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 14 }}
        ListEmptyComponent={
          <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
            No addresses yet.
          </Text>
        }
        renderItem={({ item }) => {
          const active = item.id === selectedAddressId;

          return (
            <Pressable
              onPress={() => {
                selectAddress(item.id);
                onClose();
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.card,
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: active ? theme.colors.primary : theme.colors.border,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]}
                  numberOfLines={1}
                >
                  {item.addressLine}
                </Text>

                <Text
                  style={[theme.typography.body, { color: theme.colors.subText, marginTop: 4 }]}
                  numberOfLines={1}
                >
                  {item.city}
                </Text>
              </View>

              {active ? (
                <Ionicons name="checkmark-circle" size={26} color={theme.colors.primary} />
              ) : (
                <Ionicons name="ellipse-outline" size={26} color={theme.colors.subText} />
              )}

              <Pressable onPress={() => removeAddress(item.id)} style={{ paddingLeft: 12 }}>
                <Ionicons name="trash-outline" size={22} color={theme.colors.subText} />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
