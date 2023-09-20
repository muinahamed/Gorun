import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenWrapper from '../../common/ScreenWrapper';
import MoreUser from './MoreUser';
import Login from './Login';
import Header from '../../common/Header';

const More = () => {
  return (
    <ScreenWrapper>
      <Header title="Account" />
      <ScrollView>
        <MoreUser />
        <Login />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default More;

const styles = StyleSheet.create({});
