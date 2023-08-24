import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../../common/ScreenWrapper';
import OnBoardingBody from './OnBoardingBody';
import OnboardingFooter from './OnboardingFooter';

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const horizontalRef = useRef();
  return (
    <ScreenWrapper>
      <OnBoardingBody
        setCurrentPage={setCurrentPage}
        horizontalRef={horizontalRef}
      />
      <OnboardingFooter
        currentPage={currentPage}
        horizontalRef={horizontalRef}
      />
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
