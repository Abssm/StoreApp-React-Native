import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyButton from '../../component/MyButton';
import BackButton from '../../component/BackButton';
import LoginCord from '../../component/LoginCord';
import { useAppTheme } from '../../context/ThemeContext';

export default function NewPassword({ navigation }) {
  const { theme } = useAppTheme();

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
          New Password
        </Text>
      </View>

      <View style={{ flex: 1, paddingTop: 40 }}>
        <LoginCord FerstTitle={'Password'} SecTitle={'Confirm Password'} />
      </View>

      <View style={{ paddingTop: 220, flexDirection: 'row', justifyContent: 'center' }}>
        <Text
          style={[
            theme.typography.body,
            { fontSize: 16, textAlign: 'center', fontWeight: '700', color: theme.colors.text },
          ]}
        >
          00:20
        </Text>

        <Text style={[theme.typography.body, { color: theme.colors.subText }]}>
          {' '}
          resend confirmation code.
        </Text>
      </View>

      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <MyButton title="Login" />
      </View>
    </SafeAreaView>
  );
}
