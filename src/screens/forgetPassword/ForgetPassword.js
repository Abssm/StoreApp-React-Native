import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../component/BackButton';
import MyButton from '../../component/MyButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VerificationScreen from '../Verification/VerificationScreen';

import { useAppTheme } from '../../context/ThemeContext';

export default function ForgetPassword({ navigation }) {
  const { theme } = useAppTheme();
  const isDark = theme.navigation.dark;

  const placeholderColor = isDark ? theme.colors.subText : '#737070';

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
          Forget Password
        </Text>

        <Image
          style={{ alignSelf: 'center', width: 340, height: 200 }}
          source={require('../../../assets/images/IMG.png')}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={[
            theme.typography.body,
            { fontSize: 20, color: theme.colors.subText, marginLeft: 20 },
          ]}
        >
          Email Address
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: theme.colors.card,
            alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="please enter your Email"
            placeholderTextColor={placeholderColor}
            style={[
              theme.typography.body,
              { color: theme.colors.text, flex: 1 },
            ]}
          />
          <Ionicons name="checkmark-outline" size={30} color="#06fd0ed6" />
        </View>

        <View style={{ paddingTop: 240 }}>
          <Text
            style={[
              theme.typography.body,
              {
                fontSize: 16,
                textAlign: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                color: theme.colors.subText,
              },
            ]}
          >
            Please write your email to receive a confirmation code to set a new
            password.
          </Text>

          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <MyButton
              title="Confirm Email"
              onPress={() => {
                navigation.navigate(VerificationScreen);
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
