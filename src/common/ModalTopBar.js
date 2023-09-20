import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MODAL_HEADER, RED} from '../utils/Color';

const ModalTopBar = () => {
  return <View style={styles.container}></View>;
};

export default ModalTopBar;

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 6,
    borderRadius: 7,
    backgroundColor: MODAL_HEADER,
    marginTop: 8,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
