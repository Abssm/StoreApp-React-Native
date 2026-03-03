// screens/auth/Welcome.js
import { View, Text, Switch, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyButton from '../../component/MyButton';
import LoginCord from '../../component/LoginCord';
import axios from 'axios';
import { useAppTheme } from '../../context/ThemeContext';

export default function Welcome({ navigation, route }) {
  const [rememberMe, setRememberMe] = useState(false);
  const { theme, cycleTheme } = useAppTheme();

  // Local state for inputs (THIS is what we use for API check)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // If we came back from SignUp, we can prefill the username (and/or email)
  useEffect(() => {
    // route.params pattern is standard in React Navigation [page:2]
    if (route?.params?.prefillUsername) setUsername(route.params.prefillUsername);
  }, [route?.params?.prefillUsername]);

  const fetchUsers = async () => {
    // Fetch all users (demo API)
    const res = await axios.get('https://api.escuelajs.co/api/v1/users');
    return res.data;
  };

  const handleLogin = async () => {
    // Basic UI validation
    const u = username.trim().toLowerCase();

    if (!u || !password) {
      // Alert.alert(title, message, buttons?) [page:3]
      Alert.alert('Missing data', 'Please enter username and password.');
      return;
    }

    setLoading(true);
    try {
      const users = await fetchUsers();

      // This API has "name" and "email". We'll match username with name.
      const found = users.find(
        (x) => (x.name || '').trim().toLowerCase() === u
      );

      if (!found) {
        // If not found -> show Alert then go to SignUp
        Alert.alert(
          'Account not found',
          'This username is not registered. Please sign up first.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Sign Up',
              onPress: () => navigation.navigate('SignUp', { prefillUsername: username }),
            },
          ]
        ); // Alert buttons supported by RN [page:3]
        return;
      }

      // If user exists -> go to app
      navigation.navigate('MainTabs');
    } catch (err) {
      Alert.alert('Error', 'Could not verify user. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 10 }}>
        <Ionicons name="color-filter-outline" size={30} color={theme.colors.text} onPress={cycleTheme} />
      </View>

      <View style={{ justifyContent: 'center', paddingTop: 100 }}>
        <Text style={[theme.typography.title, { fontSize: 50, textAlign: 'center', fontWeight: '800', color: theme.colors.text }]}>
          Welcome
        </Text>

        <Text style={[theme.typography.body, { fontSize: 20, color: theme.colors.subText, textAlign: 'center' }]}>
          Please enter your data to continue
        </Text>
      </View>

      <View style={{ flex: 8, justifyContent: 'center', paddingTop: 100 }}>
        {/* Controlled inputs */}
        <LoginCord
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={[theme.typography.body, { fontSize: 20, color: 'red', textAlign: 'right', marginRight: 20 }]}>
              Forgot Password?
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              marginRight: 20,
              alignItems: 'center',
            }}
          >
            <Text style={[theme.typography.body, { fontSize: 20, color: theme.colors.text }]}>
              Remember me
            </Text>

            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={rememberMe ? theme.colors.onPrimary : theme.colors.card}
              ios_backgroundColor={theme.colors.border}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
            <Text style={[theme.typography.body, { fontSize: 18, color: theme.colors.subText }]}>
              Dosen't have an account?
            </Text>

            <Pressable onPress={() => navigation.navigate('SignUp', { prefillUsername: username })}>
              <Text style={[theme.typography.body, { fontSize: 18, color: theme.colors.primary, fontWeight: '700' }]}>
                {' '}Sign Up
              </Text>
            </Pressable>
          </View>

          <View style={{ paddingTop: 40, marginRight: 20 }}>
            <Text style={[theme.typography.body, { fontSize: 16, textAlign: 'center', color: theme.colors.subText }]}>
              By connecting your account confirm that you agree with our
              <Text style={{ fontWeight: '700', color: theme.colors.text }}> Term and Condition</Text>
            </Text>

            <View style={{ paddingTop: 20 }}>
              <MyButton title={loading ? 'Checking...' : 'Login'} onPress={handleLogin} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
