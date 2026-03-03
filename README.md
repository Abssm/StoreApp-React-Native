# StoreApp-React-Native

A React Native (CLI) **JavaScript** mobile app template for store-style projects. It focuses on clean UI structure, reusable components, and a demo authentication flow with a public API. The app includes Welcome/Login and Sign Up screens, light/dark theme toggling via a Theme Context, and alert-driven UX when a user tries to log in with an account that doesn’t exist.

GitHub: https://github.com/Abssm/StoreApp-React-Native  
Author: https://github.com/Abssm (@Abssm)  
License: MIT

---

## Features

- React Native CLI project (React Native `0.84.0`)
- Welcome/Login screen
- Sign Up screen with basic validation and user creation
- Demo login check (user existence) using a public users API
- Native `Alert` when the account is not found, then redirect to Sign Up
- Navigate back to Welcome after Sign Up (optionally with prefilled username via route params)
- Light/Dark mode toggle (ThemeContext)
- Reusable UI components (inputs, buttons, back button patterns)
- Bottom tabs + stack navigation

---

## Tech Stack

- React Native + React Hooks
- React Navigation (`@react-navigation/native`, `native-stack`, `bottom-tabs`)
- Axios for HTTP requests
- `react-native-vector-icons`
- `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler`

> For many navigation setups, `react-native-gesture-handler` needs to be imported at the top of your entry file (e.g., `index.js`) to avoid production crashes. See React Navigation / RNGH docs. [web:74][web:70]

---

## Demo Auth Flow (How it works)

> This is a **demo** flow (not secure authentication). The API used here does not provide real password verification, tokens, or sessions.

1. User enters username/password on **Welcome**
2. App fetches users from: `https://api.escuelajs.co/api/v1/users`
3. If username is not found:
   - Show an alert (“Account not found”)
   - Redirect to **Sign Up**
4. After successful Sign Up (POST new user):
   - Navigate back to **Welcome**
   - Optionally prefill username via navigation params
5. User can then log in and continue to the main app (tabs)

---

## Requirements

- Node.js `>= 22.11.0` (as set in `package.json`)
- React Native CLI environment setup
- Android Studio (Android) and/or Xcode (iOS)
- CocoaPods for iOS

---

## Installation

```bash
git clone https://github.com/Abssm/StoreApp-React-Native.git
cd StoreApp-React-Native
npm install
# or
yarn
---
iOS Pods
bash
cd ios
pod install
cd ..
Run the App
Start Metro
bash
npm start
# or
yarn start
Android
bash
npm run android
# or
yarn android
iOS
bash
npm run ios
# or
yarn ios
Available Scripts
npm start – start Metro bundler

npm run android – run Android app

npm run ios – run iOS app

npm run lint – run ESLint

npm test – run Jest tests

Dependencies (highlights)
Navigation: @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs

Networking: axios

UI/system: react-native-safe-area-context, react-native-screens, react-native-gesture-handler

Icons: react-native-vector-icons

License
MIT License.

The MIT License is permissive and allows you to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, as long as the copyright notice and license text are included with copies or substantial portions of the software. [web:58][web:67]

Contributing
Issues and pull requests are welcome:

Open an issue with steps to reproduce (and screenshots/logs if possible)

Submit a PR with a clear description of what you changed and why
