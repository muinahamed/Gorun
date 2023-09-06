import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './module/onboarding/Onboarding';
import MobileSignup from './module/signup/MobileSignup';
import OtpVerification from './module/signup/OtpVerification';
import Home from './module/homeScreen/Home';
import ShopDetails from './module/shopDetails/ShopDetails';
import SearchAll from './module/searchAll/SearchAll';
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="mobileSignup"
        component={MobileSignup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="otpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="shopDetails"
        component={ShopDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="searchAll"
        component={SearchAll}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;

const styles = StyleSheet.create({});
