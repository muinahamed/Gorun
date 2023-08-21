import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../../common/ScreenWrapper';
import OnBoardingBody from './OnBoardingBody';

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <OnBoardingBody />
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
