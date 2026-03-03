import { View, Text, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyButton from '../../component/MyButton';
import BackButton from '../../component/BackButton';

import { useAppTheme } from '../../context/ThemeContext';

export default function VerificationScreen({ navigation }) {
  const { theme } = useAppTheme();

  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(null);
  const [sec, setSec] = useState(30);

  
  useEffect(() => {
    const id = setInterval(() => {
      setSec(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, []);



  const setDigit = (index, value) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
  };

  const handleConfirm = () => {
    const entered = code.join('');

    if (entered.length < 4) {
      setError('Please enter the 4-digit code !');
      return;
    }

    if (entered === '1424') {
      setError(null);
      navigation.navigate('NewPassword');
    } else {
      setError('Wrong code. Please try again.');
    }
  };



  const otpBoxStyle = (hasError) => ({
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: 80,
    height: 80,
    backgroundColor: theme.colors.card,
    borderColor: hasError ? theme.colors.error : theme.colors.border,
    color: theme.colors.text,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flex: 1 }}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text
          style={[
            theme.typography.title,
            {
              fontSize: 35,
              textAlign: 'center',
              paddingVertical: 40,
              fontWeight: '700',
              color: theme.colors.text,
            },
          ]}
        >
          Verification Code
        </Text>

        <Image
          style={{ alignSelf: 'center', width: 340, height: 200 }}
          source={require('../../../assets/images/IMG.png')}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 30,
          paddingTop: 240,
        }}
      >
        <TextInput
          value={code[0]}
          onChangeText={(v) => setDigit(0, v)}
          keyboardType="number-pad"
          maxLength={1}
          style={otpBoxStyle(!!error)}
        />
        <TextInput
          value={code[1]}
          onChangeText={(v) => setDigit(1, v)}
          keyboardType="number-pad"
          maxLength={1}
          style={otpBoxStyle(!!error)}
        />
        <TextInput
          value={code[2]}
          onChangeText={(v) => setDigit(2, v)}
          keyboardType="number-pad"
          maxLength={1}
          style={otpBoxStyle(!!error)}
        />
        <TextInput
          value={code[3]}
          onChangeText={(v) => setDigit(3, v)}
          keyboardType="number-pad"
          maxLength={1}
          style={otpBoxStyle(!!error)}
        />

        <View style={{ flexDirection: 'column' }}>
          {error ? (
            <Text style={[theme.typography.body, { color: theme.colors.error, textAlign: 'center', marginTop: 12, fontSize: 18 }]}>
              {error}
            </Text>
          ) : null}
        </View>
      </View>

   
      <View style={{ paddingTop: 220, flexDirection: "row", justifyContent: "center" }}>
           <Text style={[theme.typography.body, { fontSize: 16, fontWeight: "700", color: theme.colors.text }]}>
            00:{String(sec).padStart(2, "0")}
           </Text>
           <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
            {" "}resend confirmation code.
          </Text>
      </View>
      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <MyButton title="Confirm Code" onPress={handleConfirm} />
      </View>
    </SafeAreaView>
  );
}
