import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../../common/ScreenWrapper';
import OnBoardingBody from './OnBoardingBody';
import OnboardingFooter from './OnboardingFooter';
import {useDispatch} from 'react-redux';
import {setFirstTimeLaunch} from '../../store/slices/appSlice';

const Onboarding = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const horizontalRef = useRef();

  useEffect(() => {
    dispatch(setFirstTimeLaunch());
  }, []);

  return (
    <ScreenWrapper>
      <OnBoardingBody
        setCurrentPage={setCurrentPage}
        horizontalRef={horizontalRef}
      />
      <OnboardingFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        horizontalRef={horizontalRef}
      />
    </ScreenWrapper>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
