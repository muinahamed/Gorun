import React from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
import {SECOND_PRIMARY, WHITE} from '../utils/Color';

const LoaderIndicator = props => {
  const {loading, backColor, top, loaderColor, size} = props;
  return loading ? (
    <View
      style={[
        styles.loaderContainer,
        {
          backgroundColor: WHITE,
          top: top ? top : 0,
        },
      ]}>
      <View
        style={[
          styles.indicator,
          {top: top ? top : 0, position: top ? 'absolute' : 'relative'},
        ]}>
        <ActivityIndicator
          size={size ? size : 'large'}
          animating={loading}
          color={SECOND_PRIMARY}
        />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 1,

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  indicator: {
    height: 40,
    width: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoaderIndicator;
