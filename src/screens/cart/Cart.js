import React, { useState } from 'react';
import { View, Text, FlatList, Image, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackButton from '../../component/BackButton';
import MyButton from '../../component/MyButton';
import AddressList from '../../component/AddressList';

import { useCart } from '../../context/CartContext';
import { useAppTheme } from '../../context/ThemeContext';

export default function Cart({ navigation }) {
  const { theme } = useAppTheme();

  const {
    items,
    incQty,
    decQty,
    removeItem,
    addresses,
    selectedAddress,
    selectedCard,
  } = useCart();

  const [showAddresses, setShowAddresses] = useState(false);

  const getLast4 = (cardNumber) => {
    const clean = String(cardNumber || '').replace(/\s+/g, '');
    return clean.slice(-4);
  };

  const subtotal = items.reduce((sum, x) => sum + x.price * x.qty, 0);
  const shipping = items.length ? 10 : 0;
  const total = subtotal + shipping;

  const openAddressPicker = () => {
    if (!addresses || addresses.length === 0) {
      navigation.navigate('Address');
      return;
    }
    setShowAddresses(true);
  };

  const openPayment = () => {
    navigation.navigate('Payment');
  };

  const onCheckout = () => {
    if (!items || items.length === 0) return;
    if (!selectedAddress) {
      openAddressPicker();
      return;
    }
    if (!selectedCard) {
      openPayment();
      return;
    }
    navigation.navigate('OrderConfirmed');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
      >
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }} />
        <Text style={[theme.typography.subtitle, { color: theme.colors.text, fontWeight: '700' }]}>
          Cart
        </Text>
        <View style={{ flex: 1 }} />
        <View style={{ width: 44 }} />
      </View>

      {/* Address picker modal */}
      <Modal
        visible={showAddresses}
        animationType="slide"
        onRequestClose={() => setShowAddresses(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
          <AddressList
            navigation={navigation}
            onClose={() => setShowAddresses(false)}
          />
        </SafeAreaView>
      </Modal>

      {/* Items list */}
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 180 }}
        ListEmptyComponent={
          <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
            Your cart is empty.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: theme.colors.card,
              borderRadius: 14,
              padding: 12,
              marginBottom: 12,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: theme.colors.bg,
              }}
              resizeMode="contain"
            />

            <View style={{ flex: 1, paddingLeft: 16 }}>
              <Text
                style={[theme.typography.body, { fontSize: 16, color: theme.colors.text, fontWeight: '700' }]}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <Text style={[theme.typography.body, { fontSize: 13, color: theme.colors.subText, marginTop: 4 }]}>
                ${item.price} (-$4.00 Tax)
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Pressable onPress={() => decQty(item.id)}>
                  <Ionicons
                    name="chevron-down-circle-outline"
                    size={28}
                    color={theme.colors.text}
                  />
                </Pressable>

                <Text style={[theme.typography.body, { color: theme.colors.text, fontSize: 18, fontWeight: '700', marginHorizontal: 12 }]}>
                  {item.qty}
                </Text>

                <Pressable onPress={() => incQty(item.id)}>
                  <Ionicons
                    name="chevron-up-circle-outline"
                    size={28}
                    color={theme.colors.text}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable onPress={() => removeItem(item.id)} style={{ padding: 8 }}>
              <Ionicons name="trash-outline" size={22} color={theme.colors.subText} />
            </Pressable>
          </View>
        )}
        ListFooterComponent={
          <View style={{ paddingTop: 8 }}>
            {/* Delivery Address */}
            <Pressable onPress={openAddressPicker} style={{ marginTop: 8 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[theme.typography.body, { fontSize: 16, color: theme.colors.text, fontWeight: '700' }]}>
                  Delivery Address
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
              </View>

              <View
                style={{
                  marginTop: 10,
                  backgroundColor: theme.colors.card,
                  borderRadius: 14,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: theme.colors.bg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                  }}
                >
                  <Ionicons name="location-outline" size={22} color={theme.colors.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]} numberOfLines={1}>
                    {selectedAddress ? selectedAddress.addressLine : 'Choose address'}
                  </Text>
                  <Text style={[theme.typography.body, { marginTop: 4, color: theme.colors.subText }]} numberOfLines={1}>
                    {selectedAddress ? selectedAddress.city : ''}
                  </Text>
                </View>

                {selectedAddress ? (
                  <Ionicons name="checkmark-circle" size={28} color={theme.colors.primary} />
                ) : null}
              </View>
            </Pressable>

            {/* Payment Method */}
            <Pressable onPress={openPayment} style={{ marginTop: 18 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[theme.typography.body, { fontSize: 16, color: theme.colors.text, fontWeight: '700' }]}>
                  Payment Method
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
              </View>

              <View
                style={{
                  marginTop: 10,
                  backgroundColor: theme.colors.card,
                  borderRadius: 14,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    backgroundColor: theme.colors.bg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                  }}
                >
                  <Ionicons name="card-outline" size={22} color={theme.colors.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]} numberOfLines={1}>
                    {selectedCard ? selectedCard.owner : 'Choose card'}
                  </Text>
                  <Text style={[theme.typography.body, { marginTop: 4, color: theme.colors.subText }]}>
                    {selectedCard ? `•••• ${getLast4(selectedCard.number)}` : ''}
                  </Text>
                </View>

                {selectedCard ? (
                  <Ionicons name="checkmark-circle" size={28} color={theme.colors.primary} />
                ) : null}
              </View>
            </Pressable>

            {/* Order Info */}
            <View style={{ marginTop: 18 }}>
              <Text style={[theme.typography.body, { fontSize: 16, color: theme.colors.text, fontWeight: '700' }]}>
                Order Info
              </Text>

              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={[theme.typography.body, { color: theme.colors.subText }]}>Subtotal</Text>
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]}>
                    ${subtotal}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={[theme.typography.body, { color: theme.colors.subText }]}>Shipping cost</Text>
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]}>
                    ${shipping}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[theme.typography.body, { color: theme.colors.subText }]}>Total</Text>
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]}>
                    ${total}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        }
      />

      {/* Sticky bottom button */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          backgroundColor: theme.colors.bg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <MyButton title="Checkout" onPress={onCheckout} />
      </View>
    </SafeAreaView>
  );
}
