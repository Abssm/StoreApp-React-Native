// screens/auth/SignUp.js
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginCord from '../../component/LoginCord';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackButton from '../../component/BackButton';
import MyButton from '../../component/MyButton';
import axios from 'axios';
import { useAppTheme } from '../../context/ThemeContext';

export default function SignUp({ navigation, route }) {
  const { theme } = useAppTheme();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prefill username if we came from Welcome (params) [page:2]
  useEffect(() => {
    if (route?.params?.prefillUsername) setUsername(route.params.prefillUsername);
  }, [route?.params?.prefillUsername]);

  const isValidUsername = (u) => u.trim().length >= 4 && u.trim().length <= 30;
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  const isValidPassword = (p) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(p);

  const fetchUsers = async () => {
    const res = await axios.get('https://api.escuelajs.co/api/v1/users');
    return res.data;
  };

  const isUniqueUsernameAndEmail = async (u, e) => {
    const users = await fetchUsers();
    const usernameTaken = users.some((x) => (x.name || '').toLowerCase() === u.trim().toLowerCase());
    const emailTaken = users.some((x) => (x.email || '').toLowerCase() === e.trim().toLowerCase());
    return { usernameTaken, emailTaken };
  };

  const handleSignUp = async () => {
    setError(null);

    // Validate
    if (!isValidUsername(username)) return setError('Username must be 4–30 characters.');
    if (!isValidEmail(email)) return setError('Email format is invalid.');
    if (!isValidPassword(password)) return setError('Password must be 8+ with upper/lower/digit/symbol.');

    setLoading(true);
    try {
      // Check unique in API
      const { usernameTaken, emailTaken } = await isUniqueUsernameAndEmail(username, email);
      if (usernameTaken) return setError('Username is already taken.');
      if (emailTaken) return setError('Email is already registered.');

      // Create user
      const payload = {
        name: username.trim(),
        email: email.trim(),
        password,
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'customer',
      };

      await axios.post('https://api.escuelajs.co/api/v1/users/', payload);

      // Go back to Welcome and prefill username so user can login
      // Passing params through navigate is standard [page:2]
      navigation.navigate('Welcome', { prefillUsername: username.trim() });
    } catch (err) {
      setError('Sign up failed. Try again.');
      Alert.alert('Sign up failed', 'Try again later.'); // Alert API [page:3]
    } finally {
      setLoading(false);
    }
  };

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
          Sign Up
        </Text>
      </View>

      <View style={{ flex: 2 }}>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          {error ? (
            <Text style={[theme.typography.body, { color: theme.colors.error, fontSize: 18 }]}>
              {error}
            </Text>
          ) : null}
        </View>

        {/* If you want, you can remove LoginCord here, because this component is for username/password.
            But keeping it is OK as long as you pass controlled props like in Welcome. */}
        <LoginCord
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />

        <View>
          <Text style={[theme.typography.body, { fontSize: 20, color: theme.colors.subText, marginLeft: 20 }]}>
            Email Address
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              alignItems: 'center',
            }}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="please enter your Email"
              placeholderTextColor={theme.colors.subText}
              style={[theme.typography.body, { flex: 1, color: theme.colors.text }]}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Ionicons name="checkmark-outline" size={30} color={theme.colors.success} />
          </View>

          <View style={{ paddingTop: 210, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[theme.typography.body, { fontSize: 16, textAlign: 'center', color: theme.colors.text }]}>
              Have an Account?
            </Text>

            <Pressable onPress={() => navigation.navigate('Welcome')}>
              <Text style={[theme.typography.body, { fontWeight: '700', color: theme.colors.primary, fontSize: 16 }]}>
                {' '}Login
              </Text>
            </Pressable>
          </View>

          <View style={{ paddingTop: 5, paddingLeft: 20 }}>
            <MyButton title={loading ? 'Signing up...' : 'Sign Up'} onPress={handleSignUp} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
