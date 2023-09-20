import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MoreUser from './MoreUser';
import MoreHeader from './MoreHeader';
import Login from './Login';

const More = () => {
  return (
    <ScreenWrapper>
      <MoreHeader />
      <MoreUser />
      <Login />
    </ScreenWrapper>
  );
};

export default More;

const styles = StyleSheet.create({});
