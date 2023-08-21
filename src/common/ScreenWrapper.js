import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import {WHITE} from '../utils/Color';

const ScreenWrapper = props => {
  const {children} = props;

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
