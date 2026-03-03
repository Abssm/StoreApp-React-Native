import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyButton from './MyButton';
import { useCart } from '../context/CartContext';
import { useAppTheme } from '../context/ThemeContext';

export default function AddNewCard({ onClose }) {
  const { theme } = useAppTheme();
  const isDark = theme.navigation.dark;

  const { addCard } = useCart();

  const [owner, setOwner] = useState('');
  const [number, setNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const onAdd = () => {
    addCard({ owner, number, exp, cvv, saveInfo });
    onClose();
  };

  const inputStyle = {
    backgroundColor: theme.colors.card,  
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,           
  };

  const placeholderColor = isDark ? theme.colors.subText : '#737070';

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {/* Header */}
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={onClose} style={{ width: 44, height: 44, justifyContent: 'center' }}>
          <Ionicons name="close" size={24} color={theme.colors.text} />
        </Pressable>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[theme.typography.subtitle, { color: theme.colors.text, fontWeight: '700' }]}>
            Add New Card
          </Text>
        </View>

        <View style={{ width: 44 }} />
      </View>

      {/* Form */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[theme.typography.body, { color: theme.colors.subText, marginTop: 8 }]}>
          Card Owner
        </Text>
        <TextInput
          value={owner}
          onChangeText={setOwner}
          placeholder="Abdullah saud"
          placeholderTextColor={placeholderColor}
          style={[theme.typography.body, inputStyle]}
        />

        <Text style={[theme.typography.body, { color: theme.colors.subText, marginTop: 14 }]}>
          Card Number
        </Text>
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder="5254 7634 8734 7690"
          placeholderTextColor={placeholderColor}
          keyboardType="number-pad"
          style={[theme.typography.body, inputStyle]}
        />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>EXP</Text>
            <TextInput
              value={exp}
              onChangeText={setExp}
              placeholder="mm/yy"
              placeholderTextColor={placeholderColor}
              style={[theme.typography.body, inputStyle]}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>CVV</Text>
            <TextInput
              value={cvv}
              onChangeText={setCvv}
              placeholder="7763"
              placeholderTextColor={placeholderColor}
              keyboardType="number-pad"
              style={[theme.typography.body, inputStyle]}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18,
          }}
        >
          <Text style={[theme.typography.body, { color: theme.colors.text }]}>Save card info</Text>

          <Switch
            value={saveInfo}
            onValueChange={setSaveInfo}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={saveInfo ? theme.colors.card : theme.colors.subText}
          />
        </View>
      </View>


      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          backgroundColor: theme.colors.bg, // was: 'white'
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <MyButton title="Add Card" onPress={onAdd} />
      </View>
    </View>
  );
}
