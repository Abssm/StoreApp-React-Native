import React, { useState } from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackButton from '../../component/BackButton';
import MyButton from '../../component/MyButton';
import { useCart } from '../../context/CartContext';
import { useAppTheme } from '../../context/ThemeContext';

export default function Address({ navigation }) {
  const { theme } = useAppTheme();
  const isDark = theme.navigation.dark;

  const { addAddress } = useCart();

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [primary, setPrimary] = useState(false);

  const onSave = () => {
    addAddress({ name, country, city, phone, addressLine, primary });
    navigation.goBack();
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

  const labelStyle = [theme.typography.body, { color: theme.colors.subText, marginTop: 14 }];
  const placeholderColor = isDark ? theme.colors.subText : '#737070';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ padding: 16 }}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text
          style={[
            theme.typography.subtitle,
            { textAlign: 'center', color: theme.colors.text, fontWeight: '700', marginTop: -28 },
          ]}
        >
          Address
        </Text>

        <Text style={labelStyle}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Abdullah Saud"
          placeholderTextColor={placeholderColor}
          style={[theme.typography.body, inputStyle]}
        />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>Country</Text>
            <TextInput
              value={country}
              onChangeText={setCountry}
              placeholder="Saudi Arabia"
              placeholderTextColor={placeholderColor}
              style={[theme.typography.body, inputStyle]}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body, { color: theme.colors.subText }]}>City</Text>
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Jeddah"
              placeholderTextColor={placeholderColor}
              style={[theme.typography.body, inputStyle]}
            />
          </View>
        </View>

        <Text style={labelStyle}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="+966 55 426 4336"
          placeholderTextColor={placeholderColor}
          keyboardType="phone-pad"
          style={[theme.typography.body, inputStyle]}
        />

        <Text style={labelStyle}>Address</Text>
        <TextInput
          value={addressLine}
          onChangeText={setAddressLine}
          placeholder="Saudi Arabia, Jeddah MCV4348"
          placeholderTextColor={placeholderColor}
          style={[theme.typography.body, inputStyle]}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 18,
          }}
        >
          <Text style={[theme.typography.body, { color: theme.colors.text }]}>
            Save as primary address
          </Text>

          <Switch
            value={primary}
            onValueChange={setPrimary}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={primary ? theme.colors.card : theme.colors.subText}
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
          backgroundColor: theme.colors.bg,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <MyButton title="Save Address" onPress={onSave} />
      </View>
    </SafeAreaView>
  );
}
