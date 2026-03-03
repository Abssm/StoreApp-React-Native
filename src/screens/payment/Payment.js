import React, { useState } from 'react';
import { View, Text, TextInput, Switch, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BackButton from '../../component/BackButton';
import MyButton from '../../component/MyButton';
import AddNewCard from '../../component/AddNewCard';

import { useCart } from '../../context/CartContext';
import { useAppTheme } from '../../context/ThemeContext';

export default function Payment({ navigation }) {
  const { theme } = useAppTheme();

  const { cards, selectedCardId, selectedCard, selectCard, removeCard } = useCart();

  const [showAddCard, setShowAddCard] = useState(false);

  const getLast4 = (cardNumber) => {
    const clean = String(cardNumber || '').replace(/\s+/g, '');
    return clean.slice(-4);
  };

  const openAddCard = () => {
    console.log('Add new card pressed');
    setShowAddCard(true);
  };

  const closeAddCard = () => {
    setShowAddCard(false);
  };

  const onSave = () => {
    if (!selectedCard) {
      setShowAddCard(true);
      return;
    }
    navigation.goBack();
  };

  // AddNewCard component
  if (showAddCard) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
        <AddNewCard onClose={closeAddCard} />
      </SafeAreaView>
    );
  }

  const inputStyle = {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, flexDirection: 'row', alignItems: 'center' }}>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }} />
        <Text style={[theme.typography.subtitle, { color: theme.colors.text, fontWeight: '700' }]}>
          Payment
        </Text>
        <View style={{ flex: 1 }} />
        <View style={{ width: 44 }} />
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 16, paddingBottom: 110 }}>
        {/* Card preview placeholder */}
        <View
          style={{
            height: 120,
            borderRadius: 18,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        />

        {/* Add new card button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openAddCard}
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 12,
            backgroundColor: theme.colors.card,
            borderWidth: 1,
            borderColor: theme.colors.border,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary} />
          <Text style={[theme.typography.body, { fontWeight: '700', color: theme.colors.primary, marginLeft: 8 }]}>
            Add new card
          </Text>
        </TouchableOpacity>

        {/* Cards list */}
        <Text style={[theme.typography.body, { marginTop: 18, fontSize: 16, fontWeight: '700', color: theme.colors.text }]}>
          Your cards
        </Text>

        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 12 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
              No cards yet.
            </Text>
          }
          renderItem={({ item }) => {
            const active = item.id === selectedCardId;
            const last4 = getLast4(item.number);

            return (
              <Pressable
                onPress={() => selectCard(item.id)}
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
                  <Text style={[theme.typography.body, { color: theme.colors.text, fontWeight: '700' }]} numberOfLines={1}>
                    {item.owner || 'Card Owner'}
                  </Text>

                  <Text style={[theme.typography.body, { color: theme.colors.subText, marginTop: 4 }]}>
                    {last4 ? `•••• ${last4}` : 'Card Number'}
                  </Text>
                </View>

                {active ? (
                  <Ionicons name="checkmark-circle" size={26} color={theme.colors.primary} />
                ) : (
                  <Ionicons name="ellipse-outline" size={26} color={theme.colors.subText} />
                )}

                <Pressable onPress={() => removeCard(item.id)} style={{ paddingLeft: 12 }}>
                  <Ionicons name="trash-outline" size={22} color={theme.colors.subText} />
                </Pressable>
              </Pressable>
            );
          }}
        />

        {/* Selected card details (read-only) */}
        <Text style={[theme.typography.body, { marginTop: 4, color: theme.colors.subText }]}>Card Owner</Text>
        <TextInput value={selectedCard?.owner || ''} editable={false} style={[theme.typography.body, inputStyle]} />

        <Text style={[theme.typography.body, { marginTop: 14, color: theme.colors.subText }]}>Card Number</Text>
        <TextInput value={selectedCard?.number || ''} editable={false} style={[theme.typography.body, inputStyle]} />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>EXP</Text>
            <TextInput value={selectedCard?.exp || ''} editable={false} style={[theme.typography.body, inputStyle]} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>CVV</Text>
            <TextInput value={selectedCard?.cvv || ''} editable={false} style={[theme.typography.body, inputStyle]} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
          <Text style={[theme.typography.body, { color: theme.colors.text }]}>Save card info</Text>

          <Switch
            value={!!selectedCard?.saveInfo}
            onValueChange={() => {}}
            disabled
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.subText}
          />
        </View>
      </View>

      {/* Bottom button */}
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
        <MyButton title="Save Card" onPress={onSave} />
      </View>
    </SafeAreaView>
  );
}
